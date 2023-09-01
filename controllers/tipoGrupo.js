const { response } = require('express')
const bcrypt = require('bcryptjs')
const TipoGrupo = require('../models/tipoGrupo')
const { generarJWT } = require('../helpers/jwt')
//getTipoGrupos TipoGrupo
const getTipoGrupos = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [tipoGrupos, total] = await Promise.all([
    TipoGrupo.find({})
      .sort({ nombre: 1 })
      .populate('tipoGrupoCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    TipoGrupo.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoGrupos,
    uid: req.uid,
    total,
  })
}
const getAllTipoGrupos = async (req, res) => {
  const [tipoGrupos, total] = await Promise.all([
    TipoGrupo.find({})
      .sort({ nombre: 1 }),
    TipoGrupo.countDocuments(),
  ])

  res.json({
    ok: true,
    tipoGrupos,
    uid: req.uid,
    total,
  })
}

//crearTipoGrupo TipoGrupo
const crearTipoGrupo = async (req, res = response) => {
  const { email, password } = req.body
  const uid = req.uid

  try {


    const tipoGrupo = new TipoGrupo({
      ...req.body
    })


    await tipoGrupo.save()


    res.json({
      ok: true,
      tipoGrupo
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarTipoGrupo TipoGrupo
const actualizarTipoGrupo = async (req, res = response) => {
  //Validar token y comporbar si es el stipoGrupo
  const uid = req.params.id
  try {
    const tipoGrupoDB = await TipoGrupo.findById(uid)
    if (!tipoGrupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoGrupo',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!tipoGrupoDB.google) {
      campos.email = email
    } else if (tipoGrupoDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El tipoGrupo de Google  no se puede actualizar',
      })
    }


    const tipoGrupoActualizado = await TipoGrupo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoGrupoActualizado,
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
    const tipoGrupoDB = await TipoGrupo.findById(uid)
    if (!tipoGrupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoGrupo',
      })
    }
    const campos = req.body
    campos.activated = !tipoGrupoDB.activated
    const tipoGrupoActualizado = await TipoGrupo.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tipoGrupoActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getTipoGrupoById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tipoGrupoDB = await TipoGrupo.findById(uid)
    if (!tipoGrupoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tipoGrupo',
      })
    }
    res.json({
      ok: true,
      tipoGrupo: tipoGrupoDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getTipoGrupos,
  crearTipoGrupo,
  actualizarTipoGrupo,
  isActive,
  getTipoGrupoById,
  getAllTipoGrupos,

}
