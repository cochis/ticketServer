const { Schema, model } = require('mongoose')
const FiestaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipoEvento: {
    type: Schema.Types.ObjectId,
    ref: "TipoEvento",
  },
  cantidad: {
    type: Number,
    required: true,
  },

  fecha: {
    type: Number,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: 'fiesta-default.jpg',

  },
  realizada: {
    type: Boolean,
    default: false,
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

FiestaSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Fiesta', FiestaSchema)
