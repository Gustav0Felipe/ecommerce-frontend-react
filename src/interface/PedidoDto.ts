import { ClientData } from "./ClientData";
import { OrderProduct } from "./OrderProduct";

export interface Pedido{
    usuario: ClientData,
    produtos : OrderProduct[],
    cep: string,
    selectedEnvio: number
}