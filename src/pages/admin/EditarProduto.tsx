import { ChangeEvent, useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useProductMutate, useUpdateProductMutate } from "../../hooks/useProductDataMutate";
import { ProductDataDto } from "../../interface/ProductDataDto";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../../interface/Categoria";
import axios, { AxiosPromise } from "axios";
import { API_URL } from "../../hooks/api";
import { UserContext } from "../../context/userContext";

export function EditarProduto(productData: ProductDataDto){

    
    const { user, userLogout } = useContext(UserContext);
    const navigate = useNavigate();
    
    var { id } = useParams();
    const [produto, setProduto] = useState<ProductDataDto>();
    const [categoria, setCategoria] = useState<Categoria>();
    const [categorias, setCategorias] = useState<Categoria[]>();
    
    const { mutate } = useUpdateProductMutate();
    
    useEffect(() => {
        const fetchData = async () : AxiosPromise<ProductDataDto> => {
                    const response = await axios.get(API_URL + "/produtos/produto/" + id)
                    setProduto(response.data);
                    setCategoria(response.data.categoria)
                    return response;
                }
        fetchData();
      }, []);
   

    const submit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        
        mutate(produto);

        navigate("/");
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        });

        if (name === 'categoria') {
            setProduto({
                ...produto,
                categoria:{
                    cod_cat: parseInt(value),
                    nome_cat: "",
                    descricao: "",
                }
            })

            setCategoria({
                        cod_cat: parseInt(value),
                        nome_cat: "",
                        descricao: "",
                },
            );
        }else{
            setProduto({
                ...produto,
                [e.target.name]: e.target.value
            });
        }
    }

    async function buscarCategorias() : AxiosPromise<any>{
        try {
            const response = await axios.get(API_URL + "/categorias", 
                {
                    headers : {
                        'Authorization' : user.token,
                    }
                }) 
                setCategorias(response.data)
                return response;
        }catch (error: any) {
            if (error.toString().includes('403')) {
                userLogout()
            }
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [user])

    return (
    <>
    {user?.role != "ADMIN" && <Navigate to="/loja/login" replace={true}></Navigate> }
    <Header></Header>
    <section id="section-principal">
        <div className="cadastro" id="cadastro-produto">
            <h1>Editar produto: </h1>
            <form className="formDados" onSubmit={submit}>
                <label htmlFor={"nome"}>Nome: </label>
                <input id={"nome"} name={"nome"} value={produto?.nome} type={"text"} maxLength={255} required placeholder={"Nome"} onChange={atualizarEstado} autoComplete={"on"}></input>
            
                <label htmlFor={"descricao"}>Descrição: </label>
                <input id={"descricao"} name={"descricao"} value={produto?.descricao} type={"text"} maxLength={255} required placeholder={"Descrição"} onChange={atualizarEstado} autoComplete={"on"}></input>
                
                <label htmlFor={"custo"}>Custo: </label>
                <input id={"custo"} name={"custo"} value={produto?.custo} type={"number"} maxLength={255} required placeholder={"Custo"} onChange={atualizarEstado} min={0} step="0.01" autoComplete={"on"}></input>
                
                <label htmlFor={"valor"}>Valor: </label>
                <input id={"valor"} name={"valor"} value={produto?.valor} type={"number"} maxLength={255} required placeholder={"Valor"} onChange={atualizarEstado} min={0} step="0.01" autoComplete={"on"}></input>
                
                <label htmlFor={"estoque"}>Estoque: </label>
                <input id={"estoque"} name={"estoque"} value={produto?.estoque} type={"number"} maxLength={10} required placeholder={"Estoque"} onChange={atualizarEstado} min={0} autoComplete={"on"}></input>
                
                <label className="block text-gray-700 font-semibold mb-2">Categoria:</label>
                    <select
                        name="categoria"
                        value={categoria?.cod_cat?.toString() || ''}
                        onChange={atualizarEstado}
                        className="border rounded bg-white text-black w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.cod_cat} value={categoria.cod_cat.toString()}>
                                {categoria.nome_cat}  |   {categoria.descricao}
                            </option>
                        ))}
                </select>
                
                <label htmlFor={"imagem"}>Imagem: </label>
                <input id={"imagem"} name={"imagem"} value={produto?.imagem} type={"text"} maxLength={255} required placeholder={"Imagem"} onChange={atualizarEstado} min={0} autoComplete={"on"}></input>
                
                <label htmlFor={"peso(kg)"}>Peso(kg): </label>
                <input id={"peso_kg"} name={"peso_kg"} value={produto?.peso_kg} type={"number"} maxLength={10} required placeholder={"Peso(kg)"} onChange={atualizarEstado} min={0} step="0.10" autoComplete={"on"}></input>
                
                <label htmlFor={"Comprimento(Cm)"}>Comprimento(Cm): </label>
                <input id={"comprimento_cm"} name={"comprimento_cm"} value={produto?.comprimento_cm} type={"number"} maxLength={10} required placeholder={"Comprimento(Cm"} onChange={atualizarEstado} min={0} autoComplete={"on"}></input>
                
                <label htmlFor={"Altura(Cm)"}>Altura(Cm): </label>
                <input id={"altura_cm"} name={"altura_cm"} value={produto?.altura_cm} type={"number"} maxLength={10} required placeholder={"Altura(Cm)"} onChange={atualizarEstado} min={0} autoComplete={"on"}></input>

                <label htmlFor={"Largura(Cm)"}>Largura(Cm): </label>
                <input id={"largura_cm"} name={"largura_cm"} value={produto?.largura_cm} type={"number"} maxLength={10} required placeholder={"Largura(Cm)"} onChange={atualizarEstado} min={0} autoComplete={"on"}></input>
      
            <button id="cadastrar" type="submit">Enviar</button>
            </form>
        </div>
    </section>
    </>
    );
}
