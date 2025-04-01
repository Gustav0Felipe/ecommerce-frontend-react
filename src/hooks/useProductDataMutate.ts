import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductDataDto } from "../interface/ProductDataDto";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { API_URL } from "./api";

export function useProductMutate(){
    const { user } = useContext(UserContext);
    
    const postData = async (data : ProductDataDto) : AxiosPromise<any> => {
        const response = await axios.post(API_URL + "/produtos", data, 
        {
            headers : {
                'Authorization' : user.token,
               
            }
        }) 
        console.log(response);
        return response;
    }
    const queryClient = useQueryClient();
    const mutate = useMutation({
        
        mutationFn: postData,//função usada para fazer fetch dos dados
        retry: 2,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['product-data']});
        }
    
    })
    
    return mutate;
}

export function useDeleteProductMutate(){
    const { user } = useContext(UserContext);
    
    const deleteData = async (id : number) : AxiosPromise<any> => {
        if(user.role == "ADMIN"){
            const response = await axios.delete(API_URL + "/produtos/" + id, {
                headers: {
                    Authorization: user.token
                }
            });
            return response;
        }else{
            return null;
        }
    }
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['product-data']});
        }
    
    })
    
    return mutate;
}

export function useReactivateProductMutate(){
    const { user } = useContext(UserContext);
    
    const deleteData = async (id : number) : AxiosPromise<any> => {
        if(user.role == "ADMIN"){
            return await axios.put(API_URL + "/produtos/reativar/" + id, id,{
                headers: {
                    Authorization: user.token
                }
            });
        }else{
            return null;
        }
    }
    const queryClient = useQueryClient();
    const mutateUp = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['product-data']});
        }
    
    })
    
    return mutateUp;
}
