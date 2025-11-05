import { createClient, RedisClientType } from 'redis'

// Redis配置接口
export interface RedisConfig {
  host: string
  port: number
  password?: string
  db?: number
  url?: string
}

// Redis操作结果接口
export interface RedisResult {
  isok: boolean
  key: string
  value: string
  expire_time: number
  ttl: number
  error: string
}

// 解析Redis URL的辅助函数
function parse_redis_url(url: string): RedisConfig {
  try {
    const url_obj = new URL(url)
    return {
      host: url_obj.hostname,
      port: parseInt(url_obj.port),
      password: url_obj.password || undefined,
      db: url_obj.pathname ? parseInt(url_obj.pathname.slice(1)) : 0,
      url: url,
    }
  } catch (error) {
    console.error('Redis URL解析失败:', error)
    throw new Error('无效的Redis URL格式')
  }
}

// 默认Redis配置
export const default_redis_config: RedisConfig = (() => {
  const redis_url = process.env.URL_redis

  if (redis_url) {
    try {
      return parse_redis_url(redis_url)
    } catch (error) {
      console.warn('Redis URL解析失败，使用默认配置:', error)
    }
  }

  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0'),
  }
})()

// Redis操作结果接口
export interface RedisResult {
  isok: boolean
  key: string
  value: string
  expire_time: number
  ttl: number
  error: string
}

// Redis客户端类
export class RedisService {
  private client: RedisClientType
  private is_connected: boolean = false
  private connection_retries: number = 0
  private max_retries: number = 3
  private retry_delay: number = 1000 // 1秒

  constructor(config: RedisConfig = default_redis_config) {
    // 优先使用URL连接方式
    if (config.url) {
      this.client = createClient({
        url: config.url,
        socket: {
          connectTimeout: 10000, // 10秒连接超时
        },
      })
    } else {
      this.client = createClient({
        socket: {
          host: config.host,
          port: config.port,
          connectTimeout: 10000,
        },
        password: config.password,
        database: config.db,
      })
    }

    // 连接事件监听
    this.client.on('connect', () => {
      console.log('Redis连接成功')
      this.is_connected = true
      this.connection_retries = 0
    })

    this.client.on('ready', () => {
      console.log('Redis客户端就绪')
    })

    this.client.on('error', (err) => {
      console.error('Redis连接错误:', err)
      this.is_connected = false
    })

    this.client.on('end', () => {
      console.log('Redis连接断开')
      this.is_connected = false
    })

    this.client.on('reconnecting', () => {
      console.log('Redis正在重新连接...')
    })
  }

  // 连接到Redis
  async connect(): Promise<void> {
    if (!this.is_connected) {
      try {
        await this.client.connect()
      } catch (error) {
        this.connection_retries++
        console.error(`Redis连接失败 (尝试 ${this.connection_retries}/${this.max_retries}):`, error)

        if (this.connection_retries >= this.max_retries) {
          throw new Error(`Redis连接失败，已重试${this.max_retries}次`)
        }

        // 等待后重试
        await new Promise((resolve) => setTimeout(resolve, this.retry_delay))
        return this.connect()
      }
    }
  }

  // 断开Redis连接
  async disconnect(): Promise<void> {
    if (this.is_connected) {
      try {
        await this.client.quit()
        this.is_connected = false
      } catch (error) {
        console.error('Redis断开连接错误:', error)
        throw error
      }
    }
  }

  // 设置键值对
  async redis_set(key: string, value: string, expire_time?: number): Promise<RedisResult> {
    try {
      await this.connect()

      if (expire_time) {
        await this.client.setEx(key, expire_time, value)
      } else {
        await this.client.set(key, value)
      }

      const ttl = await this.client.ttl(key)

      return {
        isok: true,
        key: key,
        value: value,
        expire_time: expire_time || 0,
        ttl: ttl > 0 ? ttl : 0,
        error: '',
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 获取键值
  async redis_get(key: string): Promise<RedisResult> {
    try {
      await this.connect()
      const value = await this.client.get(key)
      const ttl = await this.client.ttl(key)

      if (value !== null) {
        return {
          isok: true,
          key: key,
          value: value,
          expire_time: 0,
          ttl: ttl > 0 ? ttl : 0,
          error: '',
        }
      } else {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '键不存在',
        }
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 删除键
  async redis_del(key: string): Promise<RedisResult> {
    try {
      await this.connect()
      const result = await this.client.del(key)

      if (result > 0) {
        return {
          isok: true,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '',
        }
      } else {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '键不存在或删除失败',
        }
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 检查键是否存在
  async redis_exists(key: string): Promise<RedisResult> {
    try {
      await this.connect()
      const exists = await this.client.exists(key)
      const ttl = await this.client.ttl(key)

      if (exists === 1) {
        const value = await this.client.get(key)
        return {
          isok: true,
          key: key,
          value: value || '',
          expire_time: 0,
          ttl: ttl > 0 ? ttl : 0,
          error: '',
        }
      } else {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '键不存在',
        }
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 设置过期时间
  async redis_expire(key: string, seconds: number): Promise<RedisResult> {
    try {
      await this.connect()
      const result = await this.client.expire(key, seconds)
      const ttl = await this.client.ttl(key)
      const value = await this.client.get(key)

      if (result === 1) {
        return {
          isok: true,
          key: key,
          value: value || '',
          expire_time: seconds,
          ttl: ttl > 0 ? ttl : 0,
          error: '',
        }
      } else {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '设置过期时间失败',
        }
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 获取剩余过期时间
  async redis_ttl(key: string): Promise<RedisResult> {
    try {
      await this.connect()
      const ttl = await this.client.ttl(key)
      const value = await this.client.get(key)

      if (ttl > 0) {
        return {
          isok: true,
          key: key,
          value: value || '',
          expire_time: 0,
          ttl: ttl,
          error: '',
        }
      } else if (ttl === 0) {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '键已过期',
        }
      } else {
        return {
          isok: false,
          key: key,
          value: '',
          expire_time: 0,
          ttl: 0,
          error: '键不存在',
        }
      }
    } catch (error) {
      return {
        isok: false,
        key: key,
        value: '',
        expire_time: 0,
        ttl: 0,
        error: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  // 获取连接状态
  get_connection_status(): boolean {
    return this.is_connected
  }

  // 获取连接信息
  get_connection_info(): string {
    const config = default_redis_config
    if (config.url) {
      return `Redis URL: ${config.url}`
    }
    return `Redis Host: ${config.host}:${config.port}, DB: ${config.db}`
  }

  // 健康检查
  async health_check(): Promise<{ status: string; message: string; timestamp: string }> {
    try {
      await this.connect()
      const ping_result = await this.client.ping()

      if (ping_result === 'PONG') {
        return {
          status: 'healthy',
          message: 'Redis连接正常',
          timestamp: new Date().toISOString(),
        }
      } else {
        return {
          status: 'unhealthy',
          message: 'Redis响应异常',
          timestamp: new Date().toISOString(),
        }
      }
    } catch (error) {
      return {
        status: 'error',
        message: `Redis连接失败: ${error instanceof Error ? error.message : '未知错误'}`,
        timestamp: new Date().toISOString(),
      }
    }
  }
}

// 创建Redis服务实例
export const redis_service = new RedisService()

// 导出配置信息用于调试
export const redis_config_info = {
  config: default_redis_config,
  connection_string: default_redis_config.url || `${default_redis_config.host}:${default_redis_config.port}`,
}
