const { Schema, model } = require('mongoose')
const EjemploSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  urlFiestaBoleto: {
    type: String,
    required: true,
  },
  fiesta: {
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
    required: true
  },
  tipo: {
    type: String,
    required: true,
  },
  recomendacion: {
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
    default: true,
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

EjemploSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Ejemplo', EjemploSchema)
