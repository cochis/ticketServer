/*
Ruta : api/tipoGrupos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getTipoGrupos,
  crearTipoGrupo,
  actualizarTipoGrupo,
  isActive,
  getTipoGrupoById,
  getAllTipoGrupos
} = require("../controllers/tipoGrupo");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getTipoGrupos);
router.get("/all", validarJWT, getAllTipoGrupos);
router.get("/:uid", validarJWT, getTipoGrupoById);
router.post(
  "/",
  [
    // validarAdminJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  crearTipoGrupo
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
  actualizarTipoGrupo
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
