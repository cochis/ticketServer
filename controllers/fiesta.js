const { response } = require('express')
const bcrypt = require('bcryptjs')
const Fiesta = require('../models/fiesta')
const { generarJWT } = require('../helpers/jwt')
//getFiestas Fiesta
const getFiestas = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [fiestas, total] = await Promise.all([
    Fiesta.find({})
      .sort({ nombre: 1 })
      .populate('fiestaCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    Fiesta.countDocuments(),
  ])

  res.json({
    ok: true,
    fiestas,
    uid: req.uid,
    total,
  })
}
const getAllFiestas = async (req, res) => {
  const [fiestas, total] = await Promise.all([
    Fiesta.find({})
      .sort({ nombre: 1 }),
    Fiesta.countDocuments(),
  ])

  res.json({
    ok: true,
    fiestas,
    uid: req.uid,
    total,
  })
}

//crearFiesta Fiesta
const crearFiesta = async (req, res = response) => {

  const uid = req.uid

  try {


    const fiesta = new Fiesta({
      ...req.body
    })


    console.log('fiesta::: ', fiesta);
    await fiesta.save()


    res.json({
      ok: true,
      fiesta
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarFiesta Fiesta
const actualizarFiesta = async (req, res = response) => {
  //Validar token y comporbar si es el sfiesta
  const uid = req.params.id
  try {
    const fiestaDB = await Fiesta.findById(uid)
    if (!fiestaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un fiesta',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!fiestaDB.google) {
      campos.email = email
    } else if (fiestaDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El fiesta de Google  no se puede actualizar',
      })
    }


    const fiestaActualizado = await Fiesta.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      fiestaActualizado,
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
    const fiestaDB = await Fiesta.findById(uid)
    if (!fiestaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un fiesta',
      })
    }
    const campos = req.body
    campos.activated = !fiestaDB.activated
    const fiestaActualizado = await Fiesta.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      fiestaActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getFiestaById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const fiestaDB = await Fiesta.findById(uid)
    if (!fiestaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un fiesta',
      })
    }
    res.json({
      ok: true,
      fiesta: fiestaDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getFiestas,
  crearFiesta,
  actualizarFiesta,
  isActive,
  getFiestaById,
  getAllFiestas,

}
