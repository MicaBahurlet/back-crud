import { Request, Response } from "express";
import Usuario, {Iuser} from "../models/usuario";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";



export const register = async (req: Request, res: Response): Promise<void> => {

    const { nombre, email, password, rol }: Iuser = req.body;

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

   res.status(201).json({ usuario });
}    

