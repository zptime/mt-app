import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Order from '../models/order'
import Cart from '../models/cart'

const router = new Router({ prefix: '/order' })

// 创建订单
router.post('/createOrder', async (ctx) => {
  const { id, price, count } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const findCard = await Cart.findOne({ cartNo: id })
    // 创建实例
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCard.detail[0].name,
      imgs: findCard.detail[0].imgs,
      status: 0
    })

    try {
      // 实例入库
      const result = await order.save()
      if (result) {
        // 订单成功后，删除购物车
        await findCard.remove()
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '订单创建失败'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: '订单创建失败'
      }
    }
  }
})

// 获取订单
router.post('/getOrders', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    } finally {}
  }
})

export default router
