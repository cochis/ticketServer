const { response } = require('express')
const bcrypt = require('bcryptjs')
const Grupo = require('../models/grupo')
const { generarJWT } = require('../helpers/jwt')
//getGrupos Grupo
const getGrupos = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [grupos, total] = await Promise.all([
    Grupo.find({})
      .sort({ nombre: 1 })
      .populate('grupoCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    Grupo.countDocuments(),
  ])

  res.json({
    ok: true,
    grupos,
    uid: req.uid,
    total,
  })
}
const getAllGrupos = async (req, res) => {
  const [grupos, total] = await Promise.all([
    Grupo.find({})
      .sort({ nombre: 1 }),
    Grupo.countDocuments(),
  ])

  res.json({
    ok: true,
    grupos,
    uid: req.uid,
    total,
  })
}

//crearGrupo Grupo
const crearGrupo = async (req, res = response) => {
  const { email, password } = req.body
  const uid = req.uid

  try {


    const grupo = new Grupo({
      ...req.body
    })


    await grupo.save()


    res.json({
      ok: true,
      grupo
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarGrupo Grupo
const actualizarGrupo = async (req, res = response) => {
  //Validar token y comporbar si es el sgrupo
  const uid = req.params.id
  try {
    const grupoDB = await Grupo.findById(uid)
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grupo',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!grupoDB.google) {
      campos.email = email
    } else if (grupoDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El grupo de Google  no se puede actualizar',
      })
    }


    const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      grupoActualizado,
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
    const grupoDB = await Grupo.findById(uid)
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grupo',
      })
    }
    const campos = req.body
    campos.activated = !grupoDB.activated
    const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      grupoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getGrupoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const grupoDB = await Grupo.findById(uid)
    if (!grupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un grupo',
      })
    }
    res.json({
      ok: true,
      grupo: grupoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getGrupos,
  crearGrupo,
  actualizarGrupo,
  isActive,
  getGrupoById,
  getAllGrupos,

}
