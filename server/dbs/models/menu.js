import mongoose from 'mongoose'
const { Schema, model } = mongoose
const Menu = new Schema({
  menu: {
    type: Array,
    required: true
  }
})

export default model('Menu', Menu)
