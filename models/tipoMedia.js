const { Schema, model } = require('mongoose')
const TipoMediaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  clave: {
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

TipoMediaSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('TipoMedia', TipoMediaSchema)
