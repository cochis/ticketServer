const { Schema, model } = require('mongoose')
const TokenPushSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  fiesta: [{
    type: Schema.Types.ObjectId,
    ref: "Fiesta",
  }],
  tokenPush: {
    type: Object
  },
  usuarioCreated
    : {
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

TokenPushSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('TokenPush', TokenPushSchema)
