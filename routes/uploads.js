/*
Ruta : api/uploads/:busqueda
*/

const { Router } = require('express')
const expressFileUpload = require('express-fileupload')

const { validarJWT } = require('../middlewares/validar-jwt')

const { fileUpload, retornaImagen, fileUploadGaleria } = require('../controllers/uploads')
const router = Router()

router.use(expressFileUpload())
router.put('/:tipo/:id', fileUpload)
router.get('/:tipo/:foto', retornaImagen)
router.get('/:fiesta/:boleto', fileUploadGaleria)

module.exports = router
