import jwt from "jsonwebtoken";


const generarJWT =  (id:string = ""):Promise<string> => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        //funcion que se encarga de generar el token. El token almacena y genera info
        jwt.sign(payload, process.env.CLAVESECRETA as string,{expiresIn: '4h'},
            (err:Error | null, token:string | undefined) => {
                if (err) {
                    console.error(err);
                    reject("No se pudo generar el token"); //porque estoy dentro de una promesa
                } else {
                    resolve(token as string);
                }
            }
        )

    })
}

export default generarJWT;