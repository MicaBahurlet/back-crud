import {Model, Schema, model } from "mongoose";
import {ROLES } from "../helpers/constants";

// primero tengo que crear la Interface, luego el Schema y después el model. 


//interface: 

export interface Iuser {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
}


//Schema:

const UserSchema = new Schema<Iuser>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});


//fn para filtrar la info que se le da al user

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, code, ...usuario } = this.toObject();
    return usuario; //usuario
}

const Usuario: Model<Iuser> = model("Usuario", UserSchema);
export default Usuario;



