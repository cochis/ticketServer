const { Schema, model } = require('mongoose')
const BoletoSchema = Schema({
  fiesta: {
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
    required: true
  },
  email: {
    type: String,
  },
  cantidadInvitados: {
    type: Number,
  },
  grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: true
  },
  salon: {
    type: Schema.Types.ObjectId,
    ref: "Salon",
    required: true
  },
  whatsapp: {
    type: String,
  },
  nombreGrupo: {
    type: String,

  },
  confirmado: {
    type: Boolean,

  },
  invitacionEnviada: {
    type: Boolean,

  },
  activated: {
    type: Boolean,
    default: false,
  },
  ocupados: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  pushNotification: [{
    type: Object,
    default: []
  }],

  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },


  fechaConfirmacion: {
    type: Number,

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
