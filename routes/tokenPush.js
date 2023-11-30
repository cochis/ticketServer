/*
Ruta : api/tokenPush
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getTokenPushs,
  crearTokenPush,
  actualizarTokenPush,
  isActive,
  getTokenPushById,
  getAllTokenPushs
} = require("../controllers/tokenPush");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getTokenPushs);
router.get("/all", validarJWT, getAllTokenPushs);
router.get("/:uid", validarAdminJWT, getTokenPushById);
router.post(
  "/",
  [


    validarCampos,
  ],
  crearTokenPush
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
  actualizarTokenPush
);


router.put(
  "/isActive/:id",
  [
    validarAdminJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  isActive
);


module.exports = router;
