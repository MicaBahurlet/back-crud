"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validacionesDB_1 = require("../helpers/validacionesDB");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
// como estamos REGISTRANDO es un POST. Tiene 3 argumentos 1= ruta 2= array validaciones 3=fn de controlador.
router.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email no es válido").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña debe tener 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    recolectarErrores_1.recolectarErrores,
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña debe tener mínimo 6 caracteres").isLength({ min: 6 }),
    recolectarErrores_1.recolectarErrores
], auth_1.login);
// para actualizar usamos patch
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es requerido").not().isEmpty(),
    (0, express_validator_1.check)("code", "El código de verificacion es requerido").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], auth_1.verifyUser);
exports.default = router;
