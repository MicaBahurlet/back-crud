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


// import mongoose from "mongoose";

// export const DB_Connection = async():Promise<void> => {
//     console.log("Esperando conexion");
//     try {
//         const url = process.env.DB_URL
//         console.log(url)
//         if (!url) {
//             throw new Error("Invalid URL: " + url);
//         }
//         await mongoose.connect(url);
//         console.log("Connected to database");

//     } catch (error) {
//         console.log(error)
//         throw new Error("Error connecting to database");
//     }
// };