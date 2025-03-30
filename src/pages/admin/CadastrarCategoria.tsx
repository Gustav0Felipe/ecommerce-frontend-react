import { ChangeEvent, useContext, useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useProductMutate } from "../../hooks/useProductDataMutate";
import { ProductDataDto } from "../../interface/ProductDataDto";
import { Navigate, useNavigate } from "react-router-dom";
import { Categoria } from "../../interface/Categoria";
import axios, { AxiosPromise } from "axios";
import { API_URL } from "../../hooks/api";
import { UserContext } from "../../context/userContext";


export function CadastrarCategoria(){

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [categoria, setCategoria] = useState<Categoria>();
    const { mutate } = useProductMutate();

   
    const submit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const postData = async () : AxiosPromise<any> => {
            const response = await axios.post(API_URL + "/categorias/cadastrar", categoria, 
                {
                    headers : {
                        'Authorization' : user.token,
                    }
                }) 
            console.log(response);
            return response;
        }
        if(categoria.descricao?.length > 0 && categoria?.nome_cat.length > 0){
            postData();
            navigate("/");
        }
    }


    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
 
        setCategoria({...categoria,
            [name]: value,
            })
    }
    
    return (
    <>
    {window.sessionStorage.getItem("isAdmin") != "true" && <Navigate to="/loja/login"></Navigate> }
    <Header></Header>
    <section id="section-principal">
        <div className="cadastro">
            <h1>Nova Categoria: </h1>
            <form className="formDados" onSubmit={submit}>
            <label>Nome: </label>
            <input
                type="text"
                name="nome_cat"
                placeholder="Digite o Nome da Categoria"
                value={categoria?.nome_cat || ''}
                onChange={atualizarEstado}
                required
            />
            <label>Descrição: </label>
            <input
                type="text"
                name="descricao"
                placeholder="Digite a Descrição da Categoria"
                value={categoria?.descricao || ''}
                onChange={atualizarEstado}
                required
            />
            <button id="cadastrar" type="submit">Enviar</button>
            </form>
        </div>
    </section>
    </>
    );
}