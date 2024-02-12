const { Schema, model } = require('mongoose')
const BoletoSchema = Schema({
  fiesta: {
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
    required: true
  },

  grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: true
  },
  nombreGrupo: {
    type: String,

  },

  telefono: {
    type: String,

  },
  email: {
    type: String,
  },
  cantidadInvitados: {
    type: Number,
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

BoletoSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Boleto', BoletoSchema)
