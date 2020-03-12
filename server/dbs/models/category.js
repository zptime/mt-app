import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Categroy = new Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    required: true
  },
  areas: {
    type: Array,
    required: true
  }
})

export default model('Categroy', Categroy)
