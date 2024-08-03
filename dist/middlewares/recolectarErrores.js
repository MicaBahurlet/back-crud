"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recolectarErrores = void 0;
const express_validator_1 = require("express-validator");
//fn para recolectar errores
const recolectarErrores = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //retorno errore en json. Sino se rompe en el front . Si o si a través de la API se pasa json. 
        res.status(400).json(errors);
    }
    else {
        //fn para pasar a la siguiente ruta
        next();
    }
};
exports.recolectarErrores = recolectarErrores;
