/*
Ruta : api/tipoCantidads
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getTipoCantidads,
  crearTipoCantidad,
  actualizarTipoCantidad,
  isActive,
  getTipoCantidadById,
  getAllTipoCantidads,
  getTipoCantidadsByEmail
} = require("../controllers/tipoCantidad");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getTipoCantidads);
router.get("/all", validarJWT, getAllTipoCantidads);
router.get("/:uid", validarJWT, getTipoCantidadById);
router.get("/email/:email", validarJWT, getTipoCantidadsByEmail);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  crearTipoCantidad
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligarotira").not().isEmpty(),

    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarTipoCantidad
);


router.put(
  "/isActive/:id",
  [
    validarJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  isActive
);


module.exports = router;
