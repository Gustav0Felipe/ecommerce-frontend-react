import axios, { AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query";
import { PedidoData } from "../interface/PedidoData";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { API_URL } from "./api";



export function usePedidosData(){
    
    const { user } = useContext(UserContext);

    const fetchDataOrder = async () : AxiosPromise<PedidoData[]> => {
        const response = await axios.get(API_URL + "/pedidos", {
            headers: {
                'Authorization' : user.token
            }
        })
        
        console.log(response);
        return response;
    }
        const query = useQuery({
            queryFn: fetchDataOrder,
            queryKey: ['pedidos-data'],
            retry: 2
        })
        
        return { ...query,
            data: query.data?.data};
    
}
