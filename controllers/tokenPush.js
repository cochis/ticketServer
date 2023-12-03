const { response } = require('express')
const webpush = require('web-push')
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
const enviarNotificacion = async (req, res = response) => {

  const vapidKey = {
    "publicKey": "BAwwprLFrUAauFfAZFT3l1eKC7WnVkiveFGH_Fy2DsdlW2McLSICBjTYovXap_zkEaVzC2AmA7zAw2YwWWEdp1U",
    "privateKey": "VjO9gqbVyXyv085LVxE7g6wlHNSDHy8IQkf3h_9eV1g"
  }

  webpush.setVapidDetails(
    'mailto:info@cochisweb.com',
    vapidKey.publicKey,
    vapidKey.privateKey
  );


  const pushNotification = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/elcN8evu1dA:APA91bGo_Inr7jq1kKaGpHNuBpd4b8_Uide06NJ3wWx0LH8dhmWJFvEqdnCcvupYS5HqiJFKiWn6fOW50zn-2JzGzNkN2bOZ7g22eiLhGhgOTNnCNYZi1CkoWMVMY7QWv_Tme1LK5wQR',
    keys: {
      auth: 'gq8FTani72L2FNCDXmoJ-w',
      p256dh: 'BOZn_4q4tJSyBtTUOS5RIxCueoEP5YP4rLrIUdhER1sfN5M2O7iBYYMgwhp0MUJtl1Csplb9DihjvCkjkPsY0y0'
    }


  }
  const payload = {
    "notifiaction": {
      "title": "Falt poco par la fiesta",
      "body": "Que pacho",
      "vibrate": [100, 50, 100],
      "image": "http://localhost:4200/assets/invitaciones/xv/july.jpeg",
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "explore",
        "title": "Te falta dios"
      }]
    }
  }
  webpush.sendNotification(
    pushNotification,
    JSON.stringify(payload)).then(res => {
      console.log('enviado0');
    }).catch(err => {
      console.log('err', err);

    })




  /* try {
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
  } */
}
module.exports = {
  getTokenPushs,
  getAllTokenPushs,
  crearTokenPush,
  actualizarTokenPush,
  isActive,
  getTokenPushById,
  enviarNotificacion

}
