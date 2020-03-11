import Router from 'koa-router'
import axios from './utils/axios'
// import Categroy from '../models/Category'

const router = new Router({
  prefix: '/category'
})

const sign = 'abcd'

// 获取产品列表页分类、区域数据
router.get('/crumbs', async (ctx) => {
  // const result = await Categroy.findOne({ city: ctx.query.city.replace('市', '') || '北京' })
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }
  const {
    status,
    data: {
      areas,
      types
    }
  } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '北京',
      sign
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [], // 分类
    types: status === 200 ? types : [] // 区域
  }
})

export default router
