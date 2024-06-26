const path = require('path')
const fs = require('fs')
const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { actualizarImagen } = require('../helpers/actualizar-imagen')
const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo
  const id = req.params.id
  const tiposValidos = [
    'usuarios',
    'fiestas',
    'salones',
    'galerias'
  ]
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es valido el archivo',
    })
  }
  //validar si existe un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se envío ningún archivo',
    })
  }

  const file = await req.files.imagen
  // console.log('file::: ', file);
  const nombreCortado = file.name.split('.')
  // console.log('nombreCortado::: ', nombreCortado);
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]
  // console.log('extensionArchivo::: ', extensionArchivo);

  // if (!extencionValida.includes(extensionArchivo)) {
  //   return res.status(400).json({
  //     ok: false,
  //     msg: 'Extension invalida',
  //   })
  // }

  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
  // console.log('nombreArchivo::: ', nombreArchivo);
  const path = `./uploads/${tipo}/${nombreArchivo}`
  // console.log('path::: ', path);
  file.mv(path, async (err) => {
    if (err) {
      // console.log('err', err)
      return res.status(500).json({
        ok: false,
        msg: 'Error al subir la imagen',
      })
    }
    await actualizarImagen(tipo, id, nombreArchivo)
    return await res.status(200).json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo,
    })
  })
}
const fileUploadGaleria = async (req, res = response) => {
  const fiesta = req.params.fiesta
  // console.log('fiesta::: ', fiesta);
  const boleto = req.params.boleto
  // console.log('boleto::: ', boleto);
  // console.log('req.body::: ', req.body);


  return await res.status(200).json({
    ok: true,
    msg: 'Archivo subido',

  })
  //validar si existe un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se envío ningún archivo',
    })
  }
  const file = await req.files.imagen
  const nombreCortado = file.name.split('.')
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
  const path = `./uploads/${tipo}/${nombreArchivo}`
  file.mv(path, async (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Error al subir la imagen',
      })
    }
    await actualizarImagen(tipo, id, nombreArchivo)
    return await res.status(200).json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo,
    })
  })
}

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo
  const foto = req.params.foto
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
  // console.log('pathImg::: ', pathImg);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg)
  } else {
    const noFound = path.join(__dirname, `../uploads/notImage.jpg`)
    res.sendFile(noFound)
  }
}

module.exports = {
  fileUpload,
  retornaImagen,
  fileUploadGaleria
}
