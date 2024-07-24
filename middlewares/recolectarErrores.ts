import { Request, Response, NextFunction } from "express";

import { Result, ValidationError, validationResult } from "express-validator";

//fn para recolectar errores

export const recolectarErrores = (req:Request, res:Response,next:NextFunction): void => {
    
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        //retorno errore en json. Sino se rompe en el front . Si o si a través de la API se pasa json. 
        res.status(400).json(errors);
    }else{
        //fn para pasar a la siguiente ruta
        next();
    }
};
