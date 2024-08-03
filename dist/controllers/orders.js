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
exports.createOrder = exports.getOrdenes = void 0;
const order_1 = __importDefault(require("../models/order")); //importamos modelo e interfas
const getOrdenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.usuarioConfirmado._id;
    //verifica y almacena el id de usuario
    const consulta = { user: usuarioId };
    //Busca el usuario en la colección de orders
    const orders = yield order_1.default.find(consulta);
    //Retorna las ordenes correspondientes al usuario
    res.json({
        data: [...orders],
    });
});
exports.getOrdenes = getOrdenes;
///funcion para crear un nuevo pedido
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body.usuarioConfirmado._id;
    const orderData = req.body;
    //de todo lo que llego al front guardo en una nueva variable el user, la deta yy el estado y TODA las info que había en orderData
    const data = Object.assign(Object.assign({}, orderData), { user: usuario, createdAt: new Date(), status: "pending" });
    //para la orden uso el modelo de Order, le paso la data como parámetro y la guardo
    const order = new order_1.default(data);
    //lo almaceno con el método de mongoose
    yield order.save();
    res.status(201).json({
        order,
    });
});
exports.createOrder = createOrder;
