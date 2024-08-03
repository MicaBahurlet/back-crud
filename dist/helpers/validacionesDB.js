"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeEmail = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const meiler_1 = require("../meiler/meiler");
const existeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeMail = yield usuario_1.default.findOne({ email });
    if (existeMail && existeMail.verified) {
        throw new Error(`El email ${email} ya existe`);
    }
    //es otro if porque necesito validar otra vez el email. 
    if (existeMail && !existeMail.verified) {
        yield (0, meiler_1.sendEmail)(email, existeMail.code);
        throw new Error(`El usuario ya existe, se ha enviado un nuevo código de verificación a ${email}`);
    }
});
exports.existeEmail = existeEmail;
