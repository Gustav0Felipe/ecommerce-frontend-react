import axios, { AxiosPromise } from "axios"
import { ProductData } from "../interface/ProductData";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "./api";

const fetchData = async () : AxiosPromise<ProductData[]> => {
    const response = await axios.get(API_URL + "/produtos" ) 
    return response;
}

export function useProductData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['product-data'],
        retry: 2
    })
    
    return { ...query,
        data: query.data?.data};
    
}