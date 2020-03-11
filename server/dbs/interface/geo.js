import Router from 'koa-router'
// import Province from '../models/province'
// import City from '../models/city'
import axios from './utils/axios'

const router = new Router({ prefix: '/geo' })

const sign = 'AJskjfsdjfkjEakj19992sfS'

// 获取用户位置信息（发送请求到服务端，服务端通过请求的ip判断，获取当前省市信息）
router.get('/getPosition', async (ctx) => {
  const resp = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  const { status, data: { province, city } } = resp
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取省份
router.get('/province', async (ctx) => {
  // const province = await Province.find()
  // ctx.body = {
  //   province: province.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

// 获取具体省份信息
router.get('/province/:id', async (ctx) => {
  // const city = await City.findOne({ id: ctx.params.id })
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map((item) => {
  //     return { province: item.province, id: item.id, name: item.name }
  //   })
  // }
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = { city }
  } else {
    ctx.body = { city: [] }
  }
})

// 获取所有城市信息，不是按照省分类
router.get('/city', async (ctx) => {
  // let city = []
  // const result = await City.find()
  // result.forEach((item) => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map((item) => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = { city }
  } else {
    ctx.body = { city: [] }
  }
})

// 获取热门城市
router.get('/hotCity', async (ctx) => {
  // const list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // const result = await City.find()
  // let nList = []
  // result.forEach((item) => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  const { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = { hots }
  } else {
    ctx.body = { hots: [] }
  }
})

// 获取菜单列表（首页左侧菜单）
router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  const { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = { menu }
  } else {
    ctx.body = { menu: [] }
  }
})

export default router
