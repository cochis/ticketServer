const { response } = require('express')
const bcrypt = require('bcryptjs')
const Role = require('../models/role')
const { generarJWT } = require('../helpers/jwt')
//getRoles Role
const getRoles = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [roles, total] = await Promise.all([
    Role.find({})
      .sort({ nombre: 1 })
      .populate('roleCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    Role.countDocuments(),
  ])

  res.json({
    ok: true,
    roles,
    uid: req.uid,
    total,
  })
}
const getAllRoles = async (req, res) => {
  const [roles, total] = await Promise.all([
    Role.find({})
      .sort({ nombre: 1 }),
    Role.countDocuments(),
  ])

  res.json({
    ok: true,
    roles,
    uid: req.uid,
    total,
  })
}

//crearRole Role
const crearRole = async (req, res = response) => {
  const { email, password } = req.body
  const uid = req.uid

  try {


    const role = new Role({
      ...req.body
    })


    await role.save()


    res.json({
      ok: true,
      role
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarRole Role
const actualizarRole = async (req, res = response) => {
  //Validar token y comporbar si es el srole
  const uid = req.params.id
  try {
    const roleDB = await Role.findById(uid)
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un role',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!roleDB.google) {
      campos.email = email
    } else if (roleDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El role de Google  no se puede actualizar',
      })
    }


    const roleActualizado = await Role.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      roleActualizado,
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
    const roleDB = await Role.findById(uid)
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un role',
      })
    }
    const campos = req.body
    campos.activated = !roleDB.activated
    const roleActualizado = await Role.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      roleActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getRoleById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const roleDB = await Role.findById(uid)
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un role',
      })
    }
    res.json({
      ok: true,
      role: roleDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

module.exports = {
  getRoles,
  crearRole,
  actualizarRole,
  isActive,
  getRoleById,
  getAllRoles,

}
