import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Province = new Schema({
  id: { type: String, required: true },
  value: { type: Array, required: true }
})

export default model('Province', Province)
