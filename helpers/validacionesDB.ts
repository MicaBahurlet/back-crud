
import Usuario, { IUser } from "../models/usuario";
import { sendEmail } from "../meiler/meiler";

export const existeEmail = async (email: string): Promise<void> => {

    const existeMail: IUser | null = await Usuario.findOne({ email });
    if (existeMail && existeMail.verified) {
        throw new Error(`El email ${email} ya existe`);
    }
    //es otro if porque necesito validar otra vez el email. 
    if (existeMail && !existeMail.verified) {
        await sendEmail(email, existeMail.code as string);
        throw new Error(`El usuario ya existe, se ha enviado un nuevo código de verificación a ${email}`);
    }

}