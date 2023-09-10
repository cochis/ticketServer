const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const Usuario = require('../models/usuario')
const Salon = require('../models/salon')
const Fiesta = require('../models/fiesta')
const Boleto = require('../models/boleto')
const Role = require('../models/role')
const Grupo = require('../models/grupo')
const Evento = require('../models/evento')


//getCiclos Ciclo
const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda
  const regex = new RegExp(busqueda, 'i')

  const [usuarios, maestros, alumnos, padres, cursos] = await Promise.all([
    Usuario.find({
      nombre: regex,
    })
  ])
  res.json({
    ok: true,
    busqueda,
    uid: req.uid,
    usuarios
  })
}
const getDocumentosColeccion = async (req, res = response) => {
  const busqueda = req.params.busqueda
  const tabla = req.params.tabla
  const regex = new RegExp(busqueda, 'i')


  let data = []
  switch (tabla) {
    case 'usuarios':
      data = await Usuario.find({
        $or: [
          { nombre: regex },
          { apellidoPaterno: regex },
          { apellidoMaterno: regex }
        ],
      })
      break
    case 'salones':
      data = await Salon.find({
        $or: [
          { nombre: regex },
          { img: regex },
          { direccion: regex },
          { lat: regex },
          { long: regex },
          { telefono: regex }
        ],
      })
      break
    case 'fiestas':
      data = await Fiesta.find({
        $or: [
          { nombre: regex },
          { cantidad: regex },
          { fecha: regex },
          { lugar: regex },

        ],
      })
      break
    case 'boletos':
      data = await Boleto.find({
        $or: [
          { nombre: regex },
          { cantidad: regex },
          { fecha: regex },
          { lugar: regex },

        ],
      })
      break


    default:
      res.status(400).json({
        ok: false,
        msg: 'No se encontro  la tabla',
      })
  }

  res.json({
    ok: true,
    busqueda,
    uid: req.uid,
    resultados: data,
  })
}
const getDocumentosColeccionCatalogo = async (req, res = response) => {
  const busqueda = req.params.busqueda
  const tabla = req.params.tabla
  const regex = new RegExp(busqueda, 'i')


  let data = []
  switch (tabla) {
    case 'usuarios':
      data = await Usuario.find({
        $or: [

          { role: busqueda },
          { salon: busqueda },


        ],
      })
      break


    default:
      res.status(400).json({
        ok: false,
        msg: 'No se encontro  la tabla',
      })
  }

  res.json({
    ok: true,
    busqueda,
    uid: req.uid,
    resultados: data,
  })
}

module.exports = {
  getTodo,
  getDocumentosColeccion,
  getDocumentosColeccionCatalogo
}
