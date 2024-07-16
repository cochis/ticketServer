const { response } = require('express')
const bcrypt = require('bcryptjs')
const TipoCantidad = require('../models/tipoCantidad')
const { generarJWT } = require('../helpers/jwt')
//getTipoCantidads TipoCantidad
const getTipoCantidads = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [tipoCantidades, total] = await Promise.all([
    TipoCantidad.find({})
      .sort({ nombre: 1 })
      .populate('usuarioCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .skip(desde)
      .limit(cant),
    TipoCantidad.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoCantidades,
    uid: req.uid,
    total,
  })
}
const getAllTipoCantidads = async (req, res) => {
  const [tipoCantidades, total] = await Promise.all([
    TipoCantidad.find({})
      .populate('usuarioCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .sort({ nombre: 1 }),
    TipoCantidad.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoCantidades,
    uid: req.uid,
    total,
  })
}

//crearTipoCantidad TipoCantidad
const crearTipoCantidad = async (req, res = response) => {
  const { email, password } = req.body
  const uid = req.uid

  campos = {
    ...req.body,
    usuarioCreated: req.uid
  }



  try {


    const tipoCantidad = new TipoCantidad({
      ...campos
    })


    await tipoCantidad.save()


    res.json({
      ok: true,
      tipoCantidad
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTipoCantidad TipoCantidad
const actualizarTipoCantidad = async (req, res = response) => {
  //Validar token y comporbar si es el stipoCantidad
  const uid = req.params.id
  try {
    const tipoCantidadDB = await TipoCantidad.findById(uid)
    if (!tipoCantidadDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoCantidad',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!tipoCantidadDB.google) {
      campos.email = email
    } else if (tipoCantidadDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El tipoCantidad de Google  no se puede actualizar',
      })
    }


    const tipoCantidadActualizado = await TipoCantidad.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoCantidadActualizado,
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
    const tipoCantidadDB = await TipoCantidad.findById(uid)
    if (!tipoCantidadDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoCantidad',
      })
    }
    const campos = req.body
    campos.activated = !tipoCantidadDB.activated
    const tipoCantidadActualizado = await TipoCantidad.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoCantidadActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getTipoCantidadById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tipoCantidadDB = await TipoCantidad.findById(uid)
    if (!tipoCantidadDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoCantidad',
      })
    }
    res.json({
      ok: true,
      tipoCantidad: tipoCantidadDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getTipoCantidadByClave = async (req, res = response) => {

  const clave = req.params.clave
  try {
    const tipoCantidadDB = await TipoCantidad.find({ clave: clave })
    if (!tipoCantidadDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoCantidad',
      })
    }
    res.json({
      ok: true,
      tipoCantidad: tipoCantidadDB[0],
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getTipoCantidadsByEmail = async (req, res = response) => {
  const email = req.params.email



  try {
    const tipoCantidadDB = await TipoCantidad.find({ usuarioCreated: email })
      .populate('usuarioCreated', 'nombre apellidoPaterno apellidoMaterno email _id')


    if (!tipoCantidadDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un salon',
      })
    }
    res.json({
      ok: true,
      tipoCantidades: tipoCantidadDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getTipoCantidads,
  crearTipoCantidad,
  actualizarTipoCantidad,
  isActive,
  getTipoCantidadById,
  getAllTipoCantidads,
  getTipoCantidadsByEmail,
  getTipoCantidadByClave

}
