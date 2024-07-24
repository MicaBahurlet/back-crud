import express, { Express } from "express";
import cors from "cors";
import {dbConnection} from "../database/config";

import authRoutes from "../routes/auth";

export class Server {
    app: Express;
    port: String | number | undefined;
    authPath: string;

    constructor() {
        this.app = express(); //se refiere a esta instancia que se ejecuta ahora, no a todaa la app.
        this.port = process.env.PORT; //accede a la variable de entorno
        this.authPath = "/auth";

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
    }

    listen() : void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}
