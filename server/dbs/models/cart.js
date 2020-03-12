import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Cart = new Schema({
  id: {
    type: String,
    required: true
  },
  detail: { // 详情，如名称、单价、数量等
    type: Array,
    required: true
  },
  cartNo: { // 购物车编号
    type: String,
    required: true
  },
  user: { // 用户
    type: String,
    required: true
  },
  time: { // 购物车创建时间
    type: String,
    required: true
  }
}, { timestamps: true })

export default model('Cart', Cart)
