
import { Router } from "express";
import { check } from "express-validator";
import {existeEmail} from "../helpers/validacionesDB";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import  {register } from "../controllers/auth";

const router = Router();

// como estamos REGISTRANDO es un POST. Tiene 3 argumentos 1= ruta 2= array validaciones 3=fn de controlador.
router.post("/register", [

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña debe tener 6 caracteres").isLength({ min: 6 }),
    check("email").custom(existeEmail),

    recolectarErrores,
], register );

export default router;





