// 通用包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
import * as dto from './dto'

@ApiTags('模型分类')
@Dec_public()
@Controller()
export class model_kind extends AppController {
  @ApiPost('create_model_kind', '创建模型分类')
  async create_model_kind(@Body() body: dto.create_model_kind) {
    console.log('create_model_kind---body:', body)
    const data = await this.db.tb_model_kind.create({
              data: {
          name: body.name,
          parent_id: body.parent_id || null,
          level: body.level,
          category_type: body.category_type,
          category_style: body.category_style || null,
          category_format: body.category_format || null,
          category_kind: body.category_kind || null,
          furniture_type: body.furniture_type || null,
        },
    })
    return { code: 200, msg: '成功:创建模型分类', result: data }
  }

  @ApiPost('update_model_kind', '更新模型分类')
  async update_model_kind(@Body() body: dto.update_model_kind) {
    console.log('update_model_kind---body:', body)
    const data = await this.db.tb_model_kind.update({
      where: { id: body.id },
              data: {
          name: body.name,
          parent_id: body.parent_id,
          level: body.level,
          category_type: body.category_type,
          category_style: body.category_style,
          category_format: body.category_format,
          category_kind: body.category_kind,
          furniture_type: body.furniture_type,
        },
    })
    return { code: 200, msg: '成功:更新模型分类', result: data }
  }

  @ApiPost('find_model_kind', '查询模型分类')
  async find_model_kind(@Body() body: dto.find_model_kind) {
    console.log('find_model_kind---body:', body)
    const where: any = {}
    if (body.level) where.level = body.level
    if (body.parent_id !== undefined) where.parent_id = body.parent_id

    const data = await this.db.tb_model_kind.findMany({
      where,
      orderBy: { id: 'asc' },
    })
    console.log('find_model_kind---data:', data)
    return { code: 200, msg: '成功:查询模型分类', result: data }
  }

  @ApiGet('get_model_kind_by_id', '根据ID获取模型分类')
  @ApiQuery({ name: 'id', description: '分类ID', required: true, type: Number, example: 1 })
  async get_model_kind_by_id(@Query('id', ParseIntPipe) id: number) {
    console.log('get_model_kind_by_id---id:', id, typeof id)
    const data = await this.db.tb_model_kind.findUnique({
      where: { id },
    })
    return { code: 200, msg: '成功:获取模型分类详情', result: data }
  }

  @ApiGet('delete_model_kind', '删除模型分类')
  @ApiQuery({ name: 'id', description: '分类ID', required: true, type: Number, example: 1 })
  async delete_model_kind(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_kind---id:', id, typeof id)
    const data = await this.db.tb_model_kind.delete({
      where: { id },
    })
    return { code: 200, msg: '成功:删除模型分类', result: data }
  }

  @ApiPost('init_model_kind_data', '初始化模型分类数据')
  async init_model_kind_data() {
    console.log('init_model_kind_data---开始初始化')
    try {
      // 清空现有数据
      await this.db.tb_model_kind.deleteMany()

      // 创建一级分类
      const level1_categories = [
        { name: '免费模型', level: 1, category_type: 'free' },
        { name: '付费模型', level: 1, category_type: 'paid' },
      ]

      const created_level1: any[] = []
      for (const category of level1_categories) {
        const result = await this.db.tb_model_kind.create({
          data: category,
        })
        created_level1.push(result)
      }

      // 创建二级分类 - 风格
      const style_categories = [
        { name: '简约风格', level: 2, category_type: 'free', category_style: 'simple', parent_id: created_level1[0].id },
        { name: '现代风格', level: 2, category_type: 'free', category_style: 'modern', parent_id: created_level1[0].id },
        { name: '工业风格', level: 2, category_type: 'free', category_style: 'industrial', parent_id: created_level1[0].id },
        { name: '简约风格', level: 2, category_type: 'paid', category_style: 'simple', parent_id: created_level1[1].id },
        { name: '现代风格', level: 2, category_type: 'paid', category_style: 'modern', parent_id: created_level1[1].id },
        { name: '工业风格', level: 2, category_type: 'paid', category_style: 'industrial', parent_id: created_level1[1].id },
      ]

      const created_style: any[] = []
      for (const category of style_categories) {
        const result = await this.db.tb_model_kind.create({
          data: category,
        })
        created_style.push(result)
      }

      // 创建二级分类 - 格式
      const format_categories = [
        { name: 'STL格式', level: 2, category_type: 'free', category_format: 'stl', parent_id: created_level1[0].id },
        { name: 'OBJ格式', level: 2, category_type: 'free', category_format: 'obj', parent_id: created_level1[0].id },
        { name: 'IGS格式', level: 2, category_type: 'free', category_format: 'igs', parent_id: created_level1[0].id },
        { name: 'STL格式', level: 2, category_type: 'paid', category_format: 'stl', parent_id: created_level1[1].id },
        { name: 'OBJ格式', level: 2, category_type: 'paid', category_format: 'obj', parent_id: created_level1[1].id },
        { name: 'IGS格式', level: 2, category_type: 'paid', category_format: 'igs', parent_id: created_level1[1].id },
      ]

      const created_format: any[] = []
      for (const category of format_categories) {
        const result = await this.db.tb_model_kind.create({
          data: category,
        })
        created_format.push(result)
      }

      // 创建二级分类 - 种类
      const kind_categories = [
        { name: '人物模型', level: 2, category_type: 'free', category_kind: 'person', parent_id: created_level1[0].id },
        { name: '汽车模型', level: 2, category_type: 'free', category_kind: 'car', parent_id: created_level1[0].id },
        { name: '飞机模型', level: 2, category_type: 'free', category_kind: 'plane', parent_id: created_level1[0].id },
        { name: '家具模型', level: 2, category_type: 'free', category_kind: 'furniture', parent_id: created_level1[0].id },
        { name: '人物模型', level: 2, category_type: 'paid', category_kind: 'person', parent_id: created_level1[1].id },
        { name: '汽车模型', level: 2, category_type: 'paid', category_kind: 'car', parent_id: created_level1[1].id },
        { name: '飞机模型', level: 2, category_type: 'paid', category_kind: 'plane', parent_id: created_level1[1].id },
        { name: '家具模型', level: 2, category_type: 'paid', category_kind: 'furniture', parent_id: created_level1[1].id },
      ]

      const created_kind: any[] = []
      for (const category of kind_categories) {
        const result = await this.db.tb_model_kind.create({
          data: category,
        })
        created_kind.push(result)
      }

      // 创建三级分类 - 家具类型
      const furniture_categories = [
        { name: '椅子', level: 3, category_type: 'free', category_kind: 'furniture', furniture_type: 'chair', parent_id: created_kind[3].id },
        { name: '床', level: 3, category_type: 'free', category_kind: 'furniture', furniture_type: 'bed', parent_id: created_kind[3].id },
        { name: '桌子', level: 3, category_type: 'free', category_kind: 'furniture', furniture_type: 'table', parent_id: created_kind[3].id },
        { name: '柜子', level: 3, category_type: 'free', category_kind: 'furniture', furniture_type: 'cabinet', parent_id: created_kind[3].id },
        { name: '椅子', level: 3, category_type: 'paid', category_kind: 'furniture', furniture_type: 'chair', parent_id: created_kind[7].id },
        { name: '床', level: 3, category_type: 'paid', category_kind: 'furniture', furniture_type: 'bed', parent_id: created_kind[7].id },
        { name: '桌子', level: 3, category_type: 'paid', category_kind: 'furniture', furniture_type: 'table', parent_id: created_kind[7].id },
        { name: '柜子', level: 3, category_type: 'paid', category_kind: 'furniture', furniture_type: 'cabinet', parent_id: created_kind[7].id },
      ]

      const created_furniture: any[] = []
      for (const category of furniture_categories) {
        const result = await this.db.tb_model_kind.create({
          data: category,
        })
        created_furniture.push(result)
      }



              const result = {
          level1_count: created_level1.length,
          style_count: created_style.length,
          format_count: created_format.length,
          kind_count: created_kind.length,
          furniture_count: created_furniture.length,
        }

      console.log('init_model_kind_data---初始化完成:', result)
      return { code: 200, msg: '成功:初始化模型分类数据', result }
    } catch (error) {
      console.error('init_model_kind_data---初始化失败:', error)
      return { code: 500, msg: '失败:初始化模型分类数据', error: error.message }
    }
  }

  @ApiGet('get_model_kind_tree', '获取分类树形结构')
  async get_model_kind_tree() {
    console.log('get_model_kind_tree---开始获取树形结构')
    try {
      const all_categories = await this.db.tb_model_kind.findMany({
        orderBy: { id: 'asc' },
      })

      // 构建树形结构
      const build_tree = (parent_id: number | null) => {
        return all_categories
          .filter((category) => category.parent_id === parent_id)
          .map((category) => ({
            ...category,
            children: build_tree(category.id),
          }))
      }

      const tree = build_tree(null)
      console.log('get_model_kind_tree---树形结构构建完成')
      return { code: 200, msg: '成功:获取分类树形结构', result: tree }
    } catch (error) {
      console.error('get_model_kind_tree---获取树形结构失败:', error)
      return { code: 500, msg: '失败:获取分类树形结构', error: error.message }
    }
  }
}

@Module({
  controllers: [model_kind],
  providers: [],
})
export class Module_model_kind {}
