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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const auth_1 = __importDefault(require("../routes/auth"));
const orders_1 = __importDefault(require("../routes/orders"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); //se refiere a esta instancia que se ejecuta ahora, no a todaa la app.
        this.port = process.env.PORT; //accede a la variable de entorno
        this.authPath = "/auth"; //subdominio de auth
        this.ordersPath = "/orders"; // subdominio de orders
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    // va a interpretar la petición en json y retornarla en json tambien 
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: "*",
        }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.ordersPath, orders_1.default);
        // Endpoint para indicar que el deploy fue exitoso
        this.app.get("/", (req, res) => {
            res.send("CRUD API");
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
// import express, { Express } from "express";
// import cors from "cors";
// // import {dbConnection} from "../database/config";
// import authRoutes from "../routes/auth";
// import ordersRoutes from "../routes/orders"
// export class Server {
//     app:Express;
//     port: string | number | undefined;
//     authPath: string;
//     ordersPath: string;
//     constructor() {
//         this.app = express();
//         this.port=process.env.PORT;
//         this.authPath= "/auth";
//         this.ordersPath="/orders";
//         // this.conectarDB();
//         this.middlewares();
//         this.routes();
//     }
//     // async conectarDB():Promise<void> {
//     //     await dbConnection();
//     // }
//     middlewares():void {
//         this.app.use(cors());
//         this.app.use(express.json());
//     }
//     routes():void {
//         this.app.use(this.authPath, authRoutes);
//         this.app.use(this.ordersPath,ordersRoutes)
//     }
//     listen(): void {
//         this.app.listen(this.port,() => {
//           console.log(`Corriendo en el puerto: ${this.port}`)
//         })
//     }
// }
