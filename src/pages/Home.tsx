import { Key } from "react";
import { Catalog } from "../components/catalog/catalog";
import { Footer } from "../components/footer/footer";
import Header from "../components/header/header"
import { useProductData } from "../hooks/useProductData";

function Home(){
    const { data } = useProductData(); 

    return(
    <>
    <Header></Header>
    <section id="section-principal">
        
        <h1>Catalogo</h1>
        
        <ol className="produtos">  
        {
        data?.map((productData: 
            { id: Key | null | undefined; nome: string; imagem: string; valor: number; }) => 
        <li className="produto" key={productData.id }> 
            <Catalog
            id={productData.id}
            nome={productData.nome} 
            imagem={productData.imagem}  
            valor={productData.valor}/>
        </li>
            )
        } 

</ol>
      </section>
      <Footer></Footer>
      
    </>
    )
}

export default Home;
