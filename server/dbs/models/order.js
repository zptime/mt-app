import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Order = new Schema({
  id: {
    type: String,
    required: true
  },
  user: { // 用户
    type: String,
    required: true
  },
  time: { // 创建时间
    type: String,
    required: true
  },
  total: { // 支付金额
    type: Number,
    required: true
  },
  imgs: { // 图片
    type: Array,
    required: true
  },
  name: { // 名称
    type: String,
    required: true
  },
  status: { // 状态：待付款-0，待使用-1，待评价-2
    type: Number,
    required: true
  }
}, { timestamps: true })

export default model('Order', Order)
