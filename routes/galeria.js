/*
Ruta : api/galerias
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getGalerias,
  crearGaleria,
  actualizarGaleria,
  isActive,
  getGaleriaById,
  getAllGalerias,
  getGaleriaByEmail,
  getGaleriaByCreador,
  getGaleriasBoleto,
  getGaleriasFiesta,
  downloadGaleriasFiesta
} = require("../controllers/galeria");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getGalerias);
router.get("/all", validarJWT, getAllGalerias);
router.get("/:uid", validarJWT, getGaleriaById);
router.get("/email/:email", validarJWT, getGaleriaByEmail);
router.get("/boleto/:boleto", validarJWT, getGaleriasBoleto);
router.get("/fiesta/:fiesta", validarJWT, getGaleriasFiesta);
router.get("/down-fiesta/:fiesta/:url", validarJWT, downloadGaleriasFiesta);
router.get("/creador/:uid", validarJWT, getGaleriaByCreador);
router.post(
  "/",
  [
    validarJWT,

    check("fiesta", "La fiesta es obligatoria").not().isEmpty(),
    check("boleto", "El boleto es obligatorio").not().isEmpty(),


    validarCampos,
  ],
  crearGaleria
);

router.put(
  "/:id",
  [
    validarJWT,

    check("direccion", "La direccion es obligatoria").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),

    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarGaleria
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
