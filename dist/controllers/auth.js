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
exports.verifyUser = exports.login = exports.register = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const meiler_1 = require("../meiler/meiler");
const generarJWT_1 = __importDefault(require("../helpers/generarJWT"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    //creo una nueva instancia del modelo usuario
    const usuario = new usuario_1.default({ nombre, email, password, rol });
    //encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt); // el salt es un bloque string unico de código que se usa para encriptar la contraseña. El hash aplica otro algoritmo de encriptado.
    // chekar roles
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.KEYFORADMIN) {
        usuario.rol = constants_1.ROLES.admin;
    }
    const newCode = randomstring_1.default.generate(6);
    usuario.code = newCode;
    //almaecenar en la base de datos
    yield usuario.save();
    //enviar coreo electrónico de autenticación, primero guarda y luego envia ek email
    yield (0, meiler_1.sendEmail)(email, newCode);
    res.status(201).json({ usuario });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    // antes de ver contraseña tenemos que saber si estrá registrado, si ya existe el email
    try {
        const usuario = yield usuario_1.default.findOne({ email });
        if (!usuario) { //si no existe el usuario aviso y luego retorno
            res.status(400).json({ msg: "El usuario no existe. Por favor cree una cuenta." });
            return;
        }
        //si el usuario existe, vamos a comprobar la contraseña con bryptjs. compareSync recibe como parametro lo que se ingresa y compara con otros datos del usuario
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            res.status(400).json({ msg: "La contraseña es incorrecta" });
            return;
        }
        const token = yield (0, generarJWT_1.default)(usuario.id);
        res.json({
            usuario, //le mando todo el objeto usuario
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" }); //para que el usuario sepa lo que pasó, es del servidor porque se supone que si entro acá ya pasó las verificaciones de email y password
    }
});
exports.login = login;
//fn para la verificación del usuario
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ email });
        if (!usuario) {
            res.status(400).json({
                msg: "No se encontró ese email en la base de datos"
            });
            return;
        }
        ;
        if (usuario.verified) {
            res.status(400).json({
                msg: "El usuario ya se encuentra verificado"
            });
            return;
        }
        if (usuario.code !== code) {
            res.status(401).json({
                msg: "El código ingresado es incorrecto"
            });
            return;
        }
        const usuarioActualizado = yield usuario_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({
            msg: "Usuario verificado correctamente"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
});
exports.verifyUser = verifyUser;
