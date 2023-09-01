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
  getAllBoletos
} = require("../controllers/boleto");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getBoletos);
router.get("/all", validarJWT, getAllBoletos);
router.get("/:uid", validarJWT, getBoletoById);
router.post(
  "/",
  [

    check("fiesta", "La fiesta es obligatoria").not().isEmpty(),


    validarCampos,
  ],
  crearBoleto
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
