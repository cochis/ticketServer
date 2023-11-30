const { response } = require('express')
const bcrypt = require('bcryptjs')
const TokenPush = require('../models/tokenPush')
const { generarJWT } = require('../helpers/jwt')
//getTokenPushs TokenPush
const getTokenPushs = async (req, res) => {
  const desde = Number(req.query.desde) || 0
  const cant = Number(req.query.cant) || 10
  const [tokenPushs, total] = await Promise.all([
    TokenPush.find({})
      .sort({ nombre: 1 })
      .populate('tokenPushCreated', 'nombre , email')
      .skip(desde)
      .limit(cant),
    TokenPush.countDocuments(),
  ])

  res.json({
    ok: true,
    tokenPushs,
    uid: req.uid,
    total,
  })
}
const getAllTokenPushs = async (req, res) => {
  const [tokenPushs, total] = await Promise.all([
    TokenPush.find({})
      .sort({ nombre: 1 }),
    TokenPush.countDocuments(),
  ])

  res.json({
    ok: true,
    tokenPushs,
    uid: req.uid,
    total,
  })
}
//crearTokenPush TokenPush
const crearTokenPush = async (req, res = response) => {
  const tok = req.body.tokenPush
  let fst = []
  fst.push(req.body.fiesta)
  const campos = {
    ...req.body,
    fiestas: fst

  }
  try {
    const tokenPushDB = await TokenPush.find({ tokenPush: tok })

    if (!tokenPushDB) {
      const tokenPush = new TokenPush({
        ...campos
      })
      await tokenPush.save()
      res.json({
        ok: true,
        tokenPush
      })
    } else {
      console.log(' req.body.fiesta::: ', req.body.fiesta);
      const tokenByParty = TokenPush.find({
        fiestas: { $all: [req.body.fiesta] }

      });
      console.log('tokenByParty::: ', tokenByParty);
    }
    res.json({
      ok: true,
      tokenPush: tokenPushDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }


}
//actualizarTokenPush TokenPush
const actualizarTokenPush = async (req, res = response) => {
  //Validar token y comporbar si es el stokenPush
  const uid = req.params.id
  try {
    const tokenPushDB = await TokenPush.findById(uid)
    if (!tokenPushDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tokenPush',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!tokenPushDB.google) {
      campos.email = email
    } else if (tokenPushDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El tokenPush de Google  no se puede actualizar',
      })
    }


    const tokenPushActualizado = await TokenPush.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tokenPushActualizado,
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
    const tokenPushDB = await TokenPush.findById(uid)
    if (!tokenPushDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tokenPush',
      })
    }
    const campos = req.body
    campos.activated = !tokenPushDB.activated
    const tokenPushActualizado = await TokenPush.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      tokenPushActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}
const getTokenPushById = async (req, res = response) => {
  const uid = req.params.uid
  try {
    const tokenPushDB = await TokenPush.findById(uid)
    if (!tokenPushDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un tokenPush',
      })
    }
    res.json({
      ok: true,
      tokenPush: tokenPushDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
module.exports = {
  getTokenPushs,
  getAllTokenPushs,
  crearTokenPush,
  actualizarTokenPush,
  isActive,
  getTokenPushById,

}
