
import Usuario, { Iuser } from "../models/usuario";

export const existeEmail = async (email: string): Promise<void> => {

    const existeMail: Iuser | null = await Usuario.findOne({ email });
    if (existeMail) {
        throw new Error(`El email ${email} ya existe`);
    }
}