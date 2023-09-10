const fs = require('fs')
const Usuario = require('../models/usuario')
const Salon = require('../models/salon')
const Fiesta = require('../models/fiesta')


const borrarImagen = (path) => {
  console.log('path::: ', path);
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
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

    default:
      break
  }
}

module.exports = {
  actualizarImagen,
}
