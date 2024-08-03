import express, { Express, Request, Response } from "express";
import cors from "cors";
import {dbConnection} from "../database/config";

import authRoutes from "../routes/auth";

import ordersRoutes from "../routes/orders";


export class Server {
    app: Express;
    port: String | number | undefined;
    authPath: string;
    ordersPath: string;


    constructor() {
        this.app = express(); //se refiere a esta instancia que se ejecuta ahora, no a todaa la app.
        this.port = process.env.PORT; //accede a la variable de entorno
        this.authPath = "/auth"; //subdominio de auth
        this.ordersPath = "/orders";// subdominio de orders

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() : Promise<void> {
        await dbConnection();
    }

        // va a interpretar la petición en json y retornarla en json tambien 
    middlewares() : void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() : void {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes); 

        // Endpoint para indicar que el deploy fue exitoso
        this.app.get("/", (req: Request, res: Response) => {
            res.send("CRUD API");
        });
    }

    listen() : void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}
