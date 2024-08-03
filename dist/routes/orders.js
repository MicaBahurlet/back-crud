"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const orders_1 = require("../controllers/orders");
const express_validator_1 = require("express-validator");
const validarVerificado_1 = require("../middlewares/validarVerificado");
const router = (0, express_1.Router)();
//guando haya un get al raís de orders debe mostrar todas las ordenes del usuario
router.get("/", [validarJWT_1.default, recolectarErrores_1.recolectarErrores], orders_1.getOrdenes);
//este es para crear un nuevo pedido 
router.post("/", [
    //siempre validar primero el token dentro del header
    validarJWT_1.default,
    validarVerificado_1.isVerified,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("items", "El array de productos es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], orders_1.createOrder);
exports.default = router;
