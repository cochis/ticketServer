/*
Ruta : api/fiestas
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getFiestas,
  crearFiesta,
  actualizarFiesta,
  isActive,
  getFiestaById,
  getAllFiestas
} = require("../controllers/fiesta");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getFiestas);
router.get("/all", validarJWT, getAllFiestas);
router.get("/:uid", validarJWT, getFiestaById);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("evento", "El tipo de evento es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("lugar", "El lugar es obligatorio").not().isEmpty(),


    validarCampos,
  ],
  crearFiesta
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("evento", "El tipo de evento es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("lugar", "El lugar es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarFiesta
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
