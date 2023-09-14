/*
Ruta : api/login
*/

const { Router } = require("express");
const { login, loginGoogle, renewToken, activeUser } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/",
  [

  ],
  login
);
router.post(
  "/google",
  [check("token", "El token es obligatorio").not().isEmpty(), validarCampos],
  loginGoogle
);
router.get(
  "/activated/:email",

  activeUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
