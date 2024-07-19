const { Schema, model } = require('mongoose')
const TipoCantidadSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  costo: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
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

TipoCantidadSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('TipoCantidad', TipoCantidadSchema)
