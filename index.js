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
app.use('/api/login', require('./routes/auth'))
app.use('/api/tipo-eventos', require('./routes/tipoEvento'))
app.use('/api/tipo-grupos', require('./routes/tipoGrupo'))
app.use('/api/fiestas', require('./routes/fiesta'))
app.use('/api/tickets', require('./routes/ticket'))
app.use('/api/salones', require('./routes/salon'))
app.use('/api/boletos', require('./routes/boleto'))
app.use('/api/upload', require('./routes/uploads'))

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
