const { Schema, model } = require('mongoose')
const SalonSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: '',
  },
  direccion: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,

  },
  long: {
    type: Number,

  },
  telefono: {
    type: Number,
    required: true,
  },

  activated: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  lastEdited: {
    type: Number,
    required: true,
    default: Date.now(),
  },

})

SalonSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Salon', SalonSchema)
