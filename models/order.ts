import { Model, Schema, Types, model } from "mongoose";

// Interface para detalles del envío de pedidos
interface IShippingDetail {
    name: string;
    cellphone:string;
    location:string;
    address:string;
}

// interface para los datos del producto
interface IItem {
    desc: string;
    id: number;
    price:number;
    quantity:number;
    title:string;
}

//ineterface de la orden de compra. Con esto se crean los documentos dentro de la database
export interface IOrder {
    createdAt: Date;

    user: Types.ObjectId; //va a ir linkeado al modelo de usuario a través del ObjectId con el id de usuario. Types es de mongoose, sin este tipo de dato no puedo usar ObjectId.
    price:number;
    shippingCost: number;
    items:IItem[]; // utiliza la interface de Item 
    shippingDetails: IShippingDetail; //utiliza la interza de ShippingDetail
    status:string;
    total:number;
}


//Schema para definir los tipos de datos que integraran cada interace.

const OrderSchema = new Schema<IOrder>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //estoy conectando con el modelo de usuario.La lógica va a estar en el controlador
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    items: {
        type: [{ // un array con cada dato del producto (item) y como es un array va como un objeto, se indica con []
            desc: {
                type: String,
                required: true,
            },
            id: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        }],
        required: true,
    },
    shippingDetails: {
        name: {
			type: String,
			required: true,
		},
		cellphone: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

//armo el modelo de las ordenes

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;