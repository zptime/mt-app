import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Categroy = new Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    require: true
  },
  areas: {
    type: Array,
    require: true
  }
})

export default model('Categroy', Categroy)
