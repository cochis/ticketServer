/*
Ruta : api/emails
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  sendMail,

} = require("../controllers/email");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post("/",
  validarJWT,
  check("to", "Es necesario destinatario").not().isEmpty(),
  check("sender", "Es necesario remitente").not().isEmpty(),
  check("fiesta", "Es necesaria una fiesta").not().isEmpty(),
  
  sendMail);


module.exports = router;
