const fs = require('fs')
const Usuario = require('../models/usuario')
const Salon = require('../models/salon')
const Fiesta = require('../models/fiesta')
const Galeria = require('../models/galeria')
const Invitacion = require('../models/invitacion')

const borrarImagen = (path) => {
  // console.log('path::: ', path);

  if (fs.existsSync(path)) {
    // console.log('borro');
    fs.unlinkSync(path)
  } else {
    // console.log('no borro');

  }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = ''
  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        return false
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`
      if (usuario.img && usuario.img !== '') {
        borrarImagen(pathViejo)
      }
      usuario.img = nombreArchivo
      await usuario.save()
      return true
      break
    case 'fiestas':
      const fiesta = await Fiesta.findById(id)
      if (!fiesta) {
        return false
      }
      pathViejo = `./uploads/fiestas/${fiesta.img}`
      if (fiesta.img && fiesta.img !== '') {

        borrarImagen(pathViejo)
      }
      fiesta.img = nombreArchivo
      await fiesta.save()
      return true
      break
    case 'salones':
      const salon = await Salon.findById(id)
      if (!salon) {
        return false
      }
      pathViejo = `./uploads/salones/${salon.img}`
      if (salon.img && salon.img !== '') {

        borrarImagen(pathViejo)
      }
      salon.img = nombreArchivo
      await salon.save()
      return true
      break
    case 'galerias':
      const galeria = await Galeria.findById(id)
      if (!galeria) {
        return false
      }
      pathViejo = `./uploads/galerias/${galeria.img}`
      if (galeria.img && galeria.img !== '') {

        borrarImagen(pathViejo)
      }
      galeria.img = nombreArchivo
      await galeria.save()
      return true
      break
    default:
      break
  }
}
const actualizarImagenTemplate = async (tipo, id, nombreArchivo, imgTemplate) => {
  console.log('imgTemplate::: ', imgTemplate);
  let pathViejo = ''
  switch (tipo) {
    case 'invitaciones':
      var invitacion = await Invitacion.findOne({ fiesta: id })
      if (!invitacion) {
        return false
      }
      switch (imgTemplate) {
        case 'mensajeImg':
          if (invitacion.data.mensajeImg !== '') {
            pathViejo = `./uploads/invitaciones/${invitacion.data.mensajeImg}`
            borrarImagen(pathViejo)
          }
          invitacion.data.mensajeImg = nombreArchivo
          console.log('invitacion::: antes de guardar ', invitacion);
          await invitacion.save()

          return true
          break;
        case 'img1':
          if (invitacion.data.img1 !== '') {
            pathViejo = `./uploads/invitaciones/${invitacion.data.img1}`
            borrarImagen(pathViejo)
          }
          invitacion.data.img1 = nombreArchivo
          console.log('invitacion::: antes de guardar ', invitacion);
          await invitacion.save()

          return true
          break;

        default:
          break;
      }
      if (invitacion.data.mensajeImg !== '') {
        pathViejo = `./uploads/invitaciones/${invitacion.data.mensajeImg}`
        borrarImagen(pathViejo)
      }
      invitacion.data.mensajeImg = nombreArchivo
      console.log('invitacion::: antes de guardar ', invitacion);
      await invitacion.save()

      return true
      break



    default:
      break
  }
}

module.exports = {
  actualizarImagen,
  actualizarImagenTemplate
}
