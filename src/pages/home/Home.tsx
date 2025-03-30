import { ChangeEvent, ChangeEventHandler, FormEvent, Key, useState } from "react";
import { Catalog } from "../../components/catalog/catalog";
import { Footer } from "../../components/footer/footer";
import { useProductData } from "../../hooks/useProductData";
import { Link } from "react-router-dom";
import Menu from "../../components/header/menu";
import JavaIcon from '../../assets/favicon.ico'
import Header from "../../components/header/header";


function Home(){
    const { data } = useProductData(); 
    const [pesquisa, setPesquisa] = useState<string>();

    function handlePesquisa(e : ChangeEvent<HTMLInputElement>){
        const { value } = e.target;
        setPesquisa(value);
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
            { id: Key | null | undefined; nome: string; imagem: string; valor: number; }) => {
                if(pesquisa == null || pesquisa?.trim().length == 0 || productData.nome.toLowerCase().includes(pesquisa?.trim().toLowerCase())){
                    return <li className="produto" key={productData.id }> 
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
