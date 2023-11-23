/*
Ruta : api/invitacions
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getInvitacions,
  crearInvitacion,
  actualizarInvitacion,
  isActive,
  getInvitacionById,
  getAllInvitacions,
  getInvitacionForSln,
  getInvitacionByClave
} = require("../controllers/invitacion");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();


router.get("/", getInvitacions);
router.get("/all", getAllInvitacions);
router.get("/all/salon", getInvitacionForSln);
router.get("/:uid", getInvitacionById);
router.get("/clave/:clave", getInvitacionByClave);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  crearInvitacion
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
  actualizarInvitacion
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
