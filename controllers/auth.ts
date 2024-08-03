import { Request, Response } from "express";
import Usuario, {IUser} from "../models/usuario";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../meiler/meiler";
import generarJWT from "../helpers/generarJWT";

export const register = async (req: Request, res: Response): Promise<void> => {

    const { nombre, email, password, rol }: IUser = req.body;

    //creo una nueva instancia del modelo usuario
   const usuario= new Usuario({ nombre, email, password, rol });  

   //encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync(password, salt); // el salt es un bloque string unico de código que se usa para encriptar la contraseña. El hash aplica otro algoritmo de encriptado.

   // chekar roles
   const adminKey = req.headers ["admin-key"];
   if (adminKey === process.env.KEYFORADMIN) {
       usuario.rol = ROLES.admin;
   }
   const newCode = randomstring.generate(6);
   usuario.code=newCode;

    //almaecenar en la base de datos
   await usuario.save();

    //enviar coreo electrónico de autenticación, primero guarda y luego envia ek email
   await sendEmail(email, newCode);

   res.status(201).json({ usuario });
} 


export const login = async (req: Request, res: Response):Promise<void> => {

    const { email, password }: IUser = req.body;
    console.log(email, password);
    // antes de ver contraseña tenemos que saber si estrá registrado, si ya existe el email
    try{
        const usuario = await Usuario.findOne({ email });

        if (!usuario) { //si no existe el usuario aviso y luego retorno
            res.status(400).json({ msg: "El usuario no existe. Por favor cree una cuenta." });
            return;
        }

        //si el usuario existe, vamos a comprobar la contraseña con bryptjs. compareSync recibe como parametro lo que se ingresa y compara con otros datos del usuario
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            res.status(400).json({ msg: "La contraseña es incorrecta" });
            return;
        }

        const token = await generarJWT( usuario.id );
        res.json({ 

            usuario, //le mando todo el objeto usuario
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" }); //para que el usuario sepa lo que pasó, es del servidor porque se supone que si entro acá ya pasó las verificaciones de email y password
    }

};

//fn para la verificación del usuario

export const verifyUser = async (req: Request, res: Response):Promise<void> => {

    const {email,code} = req.body;

    try {
        const usuario= await Usuario.findOne({email});

        if(!usuario){
            res.status(400).json({
                msg:"No se encontró ese email en la base de datos"
            })
            return;
        };

        if(usuario.verified) {
            res.status(400).json({
                msg:"El usuario ya se encuentra verificado"
            })
            return;
        }

        if(usuario.code!==code) {
            res.status(401).json({
                msg:"El código ingresado es incorrecto"
            });
            return;
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate({email},{verified:true})

        res.status(200).json({
            msg:"Usuario verificado correctamente"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg:"Error en el servidor"
        });
    }

  
};
