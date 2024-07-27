import { Router } from "express";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { createOrder, getOrdenes } from "../controllers/orders";
import { check } from "express-validator";
import { isVerified } from "../middlewares/validarVerificado";


const router = Router();

//guando haya un get al raís de orders debe mostrar todas las ordenes del usuario
router.get("/",[validarJWT, recolectarErrores],getOrdenes);

//este es para crear un nuevo pedido 
router.post("/",[
    //siempre validar primero el token dentro del header
        validarJWT,
        isVerified,
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
        check("total", "El total es obligatorio").not().isEmpty(),
        check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
        check("items", "El array de productos es obligatorio").not().isEmpty(),
        recolectarErrores
    ],createOrder);

export default router;