const { Schema, model } = require('mongoose')
const TipoGrupoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
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

TipoGrupoSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('TipoGrupo', TipoGrupoSchema)
