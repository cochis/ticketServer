/*
Ruta : api/boletos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getBoletos,
  crearBoleto,
  actualizarBoleto,
  isActive,
  getBoletoById,
  getAllBoletos,
  getBoletoByFiesta,
  confirmaBoleto,
  registrarAsistencia,
  getBoletosByEmail
} = require("../controllers/boleto");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getBoletos);
router.get("/all", validarJWT, getAllBoletos);
router.get("/:uid", getBoletoById);
router.get("/email/:email", validarJWT, getBoletosByEmail);
router.get("/fiesta/:uid", getBoletoByFiesta);
router.get("/confirma-fiesta/:uid", confirmaBoleto);
router.post(
  "/",

  [
    validarJWT,
    check("fiesta", "La fiesta es obligatoria").not().isEmpty(),


    validarCampos,
  ],
  crearBoleto
);
router.post(
  "/registro/:id",
  [
    check("fiesta", "La fiesta es obligatoria").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarBoleto
);
router.put(
  "/registrar-asistencias/:id",
  [



    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  registrarAsistencia
);
router.put(
  "/:id",
  [
    validarJWT,
    check("fiesta", "La fiesta es obligatoria").not().isEmpty(),


    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarBoleto
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
