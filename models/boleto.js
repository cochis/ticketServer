const { Schema, model } = require('mongoose')
const BoletoSchema = Schema({
  fiesta: {
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
    required: true
  },

  invitados: {
    type: Object,

  },

  llena: {
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

BoletoSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Boleto', BoletoSchema)
