"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        //funcion que se encarga de generar el token. El token almacena y genera info
        jsonwebtoken_1.default.sign(payload, process.env.CLAVESECRETA, { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.error(err);
                reject("No se pudo generar el token"); //porque estoy dentro de una promesa
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
