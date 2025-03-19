import axios from "axios";
import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/userContext";
import { API_URL } from "./api";


export function usePedidoDetailsMutate(){

    const { user } = useContext(UserContext);
    const putData = async (pedido : any) => {
        const finalizarPedido = await axios.put(API_URL + "/pedidos/pedido/" + pedido, null,
        {
            headers : {
                'Authorization': user.token
            }

        });
        return finalizarPedido;
    }
    const queryClient = useQueryClient();
    const mutate = useMutation({
        
        mutationFn: putData,
        retry: 2,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['pedido-details']});
        }
    
    })
    
    return mutate;
}
