//跨域配置
export async function filter_cors(app) {
  //
  // const config = {
  //     origin: true,
  //     methods: 'GET,PUT,POST',
  //     allowedHeaders: 'Content-Type,Authorization',
  //     exposedHeaders: 'Content-Range,X-Content-Range',
  //     credentials: true,
  //     maxAge: 3600,
  // }

  const config = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, token', // 允许 token 头
    exposedHeaders: 'Content-Range,X-Content-Range',
    credentials: true, // 允许携带凭证（如 cookies, authorization headers）
    maxAge: 3600,
  }
  app.enableCors(config)
}
