/*
Ruta : api/roles
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getRoles,
  crearRole,
  actualizarRole,
  isActive,
  getRoleById,
  getAllRoles
} = require("../controllers/role");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getRoles);
router.get("/all", validarJWT, getAllRoles);
router.get("/:uid", validarJWT, getRoleById);
router.post(
  "/",
  [
    // validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  crearRole
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
  actualizarRole
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
