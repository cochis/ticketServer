const { Schema, model } = require('mongoose')
const InvitacionSchema = Schema({
  fiesta: {
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
    required: true
  },
  boleto: {
    type: Schema.Types.ObjectId,
    ref: "Boleto",
    required: true
  },
  envios: {
    type: Object
  },
  templateOK: {
    type: Boolean
  },
  template: {
    type: String
  },
  opcion: {
    type: Number
  },
  informacion: {
    type: Object
  },
  reaizada: {
    type: Boolean
  },
  finalizada: {
    type: Boolean
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

InvitacionSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Invitacion', InvitacionSchema)
