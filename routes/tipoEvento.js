/*
Ruta : api/tipoEventos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getTipoEventos,
  crearTipoEvento,
  actualizarTipoEvento,
  isActive,
  getTipoEventoById,
  getAllTipoEventos
} = require("../controllers/tipoEvento");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getTipoEventos);
router.get("/all", validarJWT, getAllTipoEventos);
router.get("/:uid", validarJWT, getTipoEventoById);
router.post(
  "/",
  [

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  crearTipoEvento
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
  actualizarTipoEvento
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
