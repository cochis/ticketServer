const fs = require('fs')
const Usuario = require('../models/usuario')


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

    default:
      break
  }
}

module.exports = {
  actualizarImagen,
}
