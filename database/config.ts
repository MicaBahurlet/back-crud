import mongoose from "mongoose";

export const dbConnection = async ():Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error('No hay URL para la base de datos, error en .env');
        }
        await mongoose.connect(dbURL);
        console.log('Base de datos conectada');
    } catch (error) {
        console.error(error);
        throw new Error('Error al iniciar la base de datos');
    }
}