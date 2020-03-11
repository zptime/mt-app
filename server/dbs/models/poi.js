import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Poi = new Schema({
  name: { type: String }, // 景点名
  province: { type: String }, // 省份
  city: { type: String }, // 城市
  county: { type: String }, // 区县
  areaCode: { type: String }, // 区号
  tel: { type: String }, // 电话
  area: { type: String }, // 地区，商圈
  addr: { type: String }, // 地址
  type: { type: String }, // 类型：丽人，餐饮等等
  module: { type: String }, // 子分类
  longitude: { type: Number }, // 经度
  latitude: { type: Number } // 纬度
})

export default model('Poi', Poi)
