require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
const path = require('path')
const https = require('https')
const fs = require('fs')
// Crear el servidor de express
const app = express()
// Configurar CORS
app.use(cors())
//Carpeta publoc
app.use('/', express.static('client', { redirect: false }))
app.use(express.static('public'))
//lectura y paseo del body
app.use(express.json())
// Base de datos
dbConnection()
// Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/roles', require('./routes/role'))
app.use('/api/contactos', require('./routes/contacto'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/eventos', require('./routes/evento'))
app.use('/api/tipo-cantidades', require('./routes/tipoCantidad'))
app.use('/api/email', require('./routes/email'))
app.use('/api/grupos', require('./routes/grupo'))
app.use('/api/tickets', require('./routes/ticket'))
app.use('/api/fiestas', require('./routes/fiesta'))
app.use('/api/invitacions', require('./routes/invitacion'))
app.use('/api/tokenPushs', require('./routes/tokenPush'))
app.use('/api/salones', require('./routes/salon'))
app.use('/api/boletos', require('./routes/boleto'))
app.use('/api/upload', require('./routes/uploads'))
app.use('/api/search', require('./routes/busquedas'))
app.use('/api/galeria', require('./routes/galeria'))
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('client/index.html'))
})
app.listen(process.env.PORT, () => {
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
})
