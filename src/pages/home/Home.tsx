import { ChangeEvent, useContext, useState } from "react";
import { Catalog } from "../../components/catalog/catalog";
import { useProductListData } from "../../hooks/useProductData";
import Header from "../../components/header/header";
import { UserContext } from "../../context/userContext";
import { useDeleteProductMutate, useReactivateProductMutate } from "../../hooks/useProductDataMutate";
import "./home.css"
import { Link } from "react-router-dom";

function Home(){
    const { data } = useProductListData(); 
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
                if(pesquisa == null || pesquisa?.trim().length == 0 || productData.nome.toLowerCase().includes(pesquisa?.trim().toLowerCase())){
                    if(user.role == "ADMIN"){
                        return <li className="produto" style={{opacity: `${productData.enabled ? '' : "50%"}`}} key={productData.id } > 
                            
                            <div className="edit-button"
                            style={{marginRight: "auto", cursor: "pointer"}}>
                            <Link to={"/loja/admin/editar-produto/" + productData.id} className="material-symbols-outlined">
                            edit
                            </Link>
                            </div>
                            <div className={`toggle-switch ${productData.enabled ? 'on' : 'off'}`} 
                            style={{marginLeft: "auto", cursor: "pointer", transition: "transform 0.3s"}}
                            onClick={
                                () => {`${productData.enabled ? disableProduct(productData.id) : activateProduct(productData.id)}`}}
                            >
                                <div className="toggle-knob"></div>
                            </div>
                            <Catalog
                            id={productData.id}
                            nome={productData.nome} 
                            imagem={productData.imagem}  
                            valor={productData.valor}/>
                            </li>
                    }else{
                        return <li className="produto" key={productData.id }> 
                        <Catalog
                        id={productData.id}
                        nome={productData.nome} 
                        imagem={productData.imagem}  
                        valor={productData.valor}/>
                        </li>
                    }
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
