const { response } = require('express')
const bcrypt = require('bcryptjs')
const TipoEvento = require('../models/tipoEvento')
const { generarJWT } = require('../helpers/jwt')
//getTipoEventos TipoEvento
const getTipoEventos = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [tipoEventos, total] = await Promise.all([
    TipoEvento.find({})
      .sort({ nombre: 1 })
      .populate('tipoEventoCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    TipoEvento.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoEventos,
    uid: req.uid,
    total,
  })
}
const getAllTipoEventos = async (req, res) => {
  const [tipoEventos, total] = await Promise.all([
    TipoEvento.find({})
      .sort({ nombre: 1 }),
    TipoEvento.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoEventos,
    uid: req.uid,
    total,
  })
}

//crearTipoEvento TipoEvento
const crearTipoEvento = async (req, res = response) => {
  const { email, password } = req.body
  const uid = req.uid

  try {


    const tipoEvento = new TipoEvento({
      ...req.body
    })


    await tipoEvento.save()


    res.json({
      ok: true,
      tipoEvento
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTipoEvento TipoEvento
const actualizarTipoEvento = async (req, res = response) => {
  //Validar token y comporbar si es el stipoEvento
  const uid = req.params.id
  try {
    const tipoEventoDB = await TipoEvento.findById(uid)
    if (!tipoEventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoEvento',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!tipoEventoDB.google) {
      campos.email = email
    } else if (tipoEventoDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El tipoEvento de Google  no se puede actualizar',
      })
    }


    const tipoEventoActualizado = await TipoEvento.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoEventoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}


const isActive = async (req, res = response) => {
  const uid = req.params.id
  try {
    const tipoEventoDB = await TipoEvento.findById(uid)
    if (!tipoEventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoEvento',
      })
    }
    const campos = req.body
    campos.activated = !tipoEventoDB.activated
    const tipoEventoActualizado = await TipoEvento.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoEventoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getTipoEventoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tipoEventoDB = await TipoEvento.findById(uid)
    if (!tipoEventoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoEvento',
      })
    }
    res.json({
      ok: true,
      tipoEvento: tipoEventoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getTipoEventos,
  crearTipoEvento,
  actualizarTipoEvento,
  isActive,
  getTipoEventoById,
  getAllTipoEventos,

}
