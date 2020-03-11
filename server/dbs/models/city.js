import mongoose from 'mongoose'
const { Schema, model } = mongoose
const City = new Schema({
  id: { type: String, required: true },
  value: { type: Array, required: true }
})

export default model('City', City)
