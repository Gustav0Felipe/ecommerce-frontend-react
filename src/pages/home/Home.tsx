import { ChangeEvent, useContext, useState } from "react";
import { Catalog } from "../../components/catalog/catalog";
import { useProductData } from "../../hooks/useProductData";
import Header from "../../components/header/header";
import { UserContext } from "../../context/userContext";
import { useDeleteProductMutate, useReactivateProductMutate } from "../../hooks/useProductDataMutate";
import "./home.css"

function Home(){
    const { data } = useProductData(); 
    const [pesquisa, setPesquisa] = useState<string>();
    const { user } = useContext(UserContext);
    const { mutate } = useDeleteProductMutate();
    const { mutateAsync } = useReactivateProductMutate();
    
    function handlePesquisa(e : ChangeEvent<HTMLInputElement>){
        const { value } = e.target;
        setPesquisa(value);
    }

    async function disableProduct(id: number){
        mutate(id);
    }

    
    async function activateProduct(id: number){
        mutateAsync(id)
    }
    return(
    <>
    <Header></Header>
    <section id="section-principal">
        <h1>Catalogo</h1>
        
        <div id="pesquisar">
            <input type="text" id="pesquisa" name="pesquisa" placeholder="Pesquisar" value={pesquisa} onChange={handlePesquisa}/>
        </div>
        <ol className="produtos">  
        {
        

        data?.map((productData: 
            { id: number | null | undefined; nome: string; imagem: string; valor: number; enabled: boolean}) => {
                if(!productData.enabled && user.role != "ADMIN"){
                    return null;
                }
                if(!productData.enabled && user.role == "ADMIN"){
                    return <li className="produto" style={{opacity: "50%"}} key={productData.id }> 
                            <div className={`toggle-switch ${productData.enabled ? 'on' : 'off'}`} 
                            style={{marginLeft: "auto", cursor: "pointer", transition: "transform 0.3s"}}
                            onClick={() => {activateProduct(productData.id)}}
                            >
                                <div className="toggle-knob"></div>
                            </div>
                            <Catalog
                            id={productData.id}
                            nome={productData.nome} 
                            imagem={productData.imagem}  
                            valor={productData.valor}/>
                            </li>
                }
                if(pesquisa == null || pesquisa?.trim().length == 0 || productData.nome.toLowerCase().includes(pesquisa?.trim().toLowerCase())){
                    return <li className="produto" key={productData.id }> 
                    {user.role == "ADMIN" &&
                        <div className={`toggle-switch ${productData.enabled ? 'on' : 'off'}`} 
                        style={{marginLeft: "auto", cursor: "pointer", transition: "transform 0.3s"}}
                        onClick={() => {disableProduct(productData.id)}}
                        >
                            <div className="toggle-knob"></div>
                        </div>
                    }
                    <Catalog
                    id={productData.id}
                    nome={productData.nome} 
                    imagem={productData.imagem}  
                    valor={productData.valor}/>
                    </li>
                }else{
                    return null;
                }
            })
        } 

        </ol>
    </section>
    </>
    )
}

export default Home;
