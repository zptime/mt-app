import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: Number, select: false }, // 隐藏
  username: { type: String, unique: true, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  email: { type: String, required: true } // 邮箱
}, { timestamps: true })

export default model('User', userSchema)