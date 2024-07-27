import { Request, Response } from "express";
import Order, { IOrder } from "../models/order"; //importamos modelo e interfas
import { ObjectId } from "mongoose"; //para poder referenciar a un elementod e otra colección. Comunciar ordenes con usuario



export const getOrdenes = async (req: Request, res:Response): Promise<void> => {    
	const usuarioId: ObjectId = req.body.usuarioConfirmado._id;
	//verifica y almacena el id de usuario
	const consulta = { user: usuarioId };
	//Busca el usuario en la colección de orders
	const orders = await Order.find(consulta);
	//Retorna las ordenes correspondientes al usuario
	res.json({
		data: [...orders],
	});
};

///funcion para crear un nuevo pedido
export const createOrder = async (req: Request, res: Response): Promise<void> => {
	const usuario: ObjectId = req.body.usuarioConfirmado._id;

	const orderData: IOrder = req.body;

    //de todo lo que llego al front guardo en una nueva variable el user, la deta yy el estado y TODA las info que había en orderData
	const data = {
		...orderData,
		user: usuario,
		createdAt: new Date(),
		status: "pending", // va aquedar en pending porque solo hago pedidos
	};

    //para la orden uso el modelo de Order, le paso la data como parámetro y la guardo
	const order = new Order(data);

    //lo almaceno con el método de mongoose
	await order.save();

	res.status(201).json({
		order,
	});
	

}