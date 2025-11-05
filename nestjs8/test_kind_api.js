const axios = require('axios');

const baseURL = 'http://127.0.0.1:3000';

// 设置请求头
axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE1MTYwMzE1MTEwIiwicGhvbmUiOiIxNTE2MDMxNTExMCIsImlkIjoxLCJyb2xlSWRzIjpbXSwiaWF0IjoxNzU2ODEzODM5LCJleHAiOjI2MjA3Mjc0MzksImlhdF90aW1lIjoiMjAyNS0wOS0wMiAxOTo1MDozOSIsImV4cF90aW1lIjoiMjA1My0wMS0xNyAxOTo1MDozOSJ9.ms6AOMGE_UYaAS3ilcdEdK6R2FGKGUVKVDBzAB_XP40';

async function testKindAPI() {
  try {
    console.log('开始测试分类API...');
    
    // 1. 测试获取分类树
    console.log('\n1. 测试获取分类树...');
    console.log('正在请求:', `${baseURL}/get_kind_tree`);
    const kindTreeResponse = await axios.get(`${baseURL}/get_kind_tree`);
    console.log('分类树响应:', JSON.stringify(kindTreeResponse.data, null, 2));
    
    // 2. 测试创建带分类的商品
    console.log('\n2. 测试创建带分类的商品...');
    const productData = {
      title: '测试商品-带分类',
      remark: '这是一个测试商品，包含分类信息',
      price_personal: 100,
      price_company: 200,
      price_extend: 300,
      is_public: true,
      is_skeleton: false,
      is_animation: false,
      is_business: false,
      is_print: true,
      is_no_collapse: true,
      area_unit: '5k以下',
      wiring: '三角形',
      count_collect: 0,
      is_check: false, // 添加缺失的字段
      is_deleted: false, // 添加缺失的字段
      model_format: 'obj', // 添加缺失的字段
      kind_ids: [1, 2], // 关联分类ID 1和2
      list_img: [],
      list_file: [],
      list_video: [],
      list_extend: []
    };
    
    const createResponse = await axios.post(`${baseURL}/save_model_product`, productData);
    console.log('创建商品响应:', JSON.stringify(createResponse.data, null, 2));
    
    if (createResponse.data.code === 200) {
      const productId = createResponse.data.result.id;
      
      // 3. 测试查询商品列表（包含分类信息）
      console.log('\n3. 测试查询商品列表...');
      const listResponse = await axios.post(`${baseURL}/find_list_model_product`, {
        page_index: 1,
        page_size: 10,
        order_by: 'created_at',
        order_type: 'desc'
      });
      console.log('商品列表响应:', JSON.stringify(listResponse.data, null, 2));
      
      // 4. 测试按分类筛选商品
      console.log('\n4. 测试按分类筛选商品...');
      const filterResponse = await axios.post(`${baseURL}/find_list_model_product`, {
        page_index: 1,
        page_size: 10,
        order_by: 'created_at',
        order_type: 'desc',
        kind_ids: [1] // 只查询分类ID为1的商品
      });
      console.log('分类筛选响应:', JSON.stringify(filterResponse.data, null, 2));
      
      // 5. 测试查询商品详情（包含分类信息）
      console.log('\n5. 测试查询商品详情...');
      const detailResponse = await axios.post(`${baseURL}/find_info_model_product`, {
        id: productId
      });
      console.log('商品详情响应:', JSON.stringify(detailResponse.data, null, 2));
    }
    
    console.log('\n测试完成！');
    
  } catch (error) {
    console.error('测试出错:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
    }
  }
}

// 直接运行测试
console.log('开始执行测试...');
testKindAPI();
