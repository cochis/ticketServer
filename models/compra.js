const { Schema, model } = require('mongoose')
const CompraSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "StatusCompra",
    required: true
  },
  paquete: {
    type: Schema.Types.ObjectId,
    ref: "TipoCantidad",
    required: true
  },
  cantidadFiestas: {
    type: Number,
    required: true
  },
  costo: {
    type: Number,
    required: true
  },
  iva: {
    type: Number,
    required: true
  },
  paypalData: {
    type: Object
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

CompraSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Compra', CompraSchema)
