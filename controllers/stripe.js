const { response } = require('express')
const bcrypt = require('bcryptjs')

const Compra = require('../models/compra')
const stripeSdkD = require('stripe')('sk_test_51PipskAbE4XYrXNxREoHGBkBAhAE13a2N4IfbhqUKQZp8R8bzHKUtTBifVKyVDF5irB0bVtnmQqiib3JU2KRvuEn00U2nv5EsR');
const stripeSdkP = require('stripe')('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');
const { generarJWT } = require('../helpers/jwt')
//getStripes Stripe


//crearStripe Stripe
const checkout = async (req, res = response) => {
  const { url_success, url_cancel, usuarioCreated, activated, lastEdited, dateCreated, ev } = req.body
  console.log('ev::: ', ev);




  try {

    const items = req.body.items.map((item) => {

      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.nombre,
            images: [item.img]
          },
          unit_amount: item.costo * 100
        },
        quantity: item.value
      }

    })
    let compra = {
      line_items: [...items],
      mode: 'payment',
      success_url: `${url_success}`,
      cancel_url: `${url_cancel}`,

    }
    if (ev == 'D') {

      const session = await stripeSdkD.checkout.sessions.create(compra);
      const compraDB = new Compra({
        compra,
        session,
        activated,
        usuarioCreated,
        lastEdited,
        dateCreated

      })
      await compraDB.save()
      console.log('session::: ', session);
      res.status(200).json(session)
    } else {

      const session = await stripeSdkP.checkout.sessions.create(compra);
      const compraDB = new Compra({
        compra,
        session,
        activated,
        usuarioCreated,
        lastEdited,
        dateCreated

      })
      await compraDB.save()
      console.log('session::: ', session);
      res.status(200).json(session)
    }



  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}
const checkSession = async (req, res = response) => {
  const session_id = req.params.session_id
  const ev = req.params.ev




  try {
    if (ev == 'D') {

      const session = await stripeSdk.checkoutD.sessions.retrieve(session_id);
    } else {

      const session = await stripeSdk.checkoutP.sessions.retrieve(session_id);
    }




    res.send({
      session,
      status: session.status,
      customer_email: session.customer_details.email
    });



  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}


module.exports = {
  checkout,
  checkSession
}
