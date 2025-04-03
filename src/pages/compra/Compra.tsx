import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header"
import { ProductData } from "../../interface/ProductData";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import axios, { AxiosPromise } from "axios";
import { API_URL } from "../../hooks/api";

function Compra(){
    var { id } = useParams();

    const [openDesc, setOpenDesc] = useState(false);
    const [ produto, setProduto ] = useState<ProductData>(null);
    const { addToCart } = useContext(CartContext);

    const handleOpenDesc = () =>{
        setOpenDesc(prev => !prev);
    }

    useEffect(() => {
        const fetchData = async () : AxiosPromise<ProductData> => {
            const response = await axios.get(API_URL + "/produtos/produto/" + id)
            setProduto(response.data);
            return response;
        }
        fetchData();
      }, []);
   
    return(
        <>
    <Header></Header>
    <section id="section-principal">
    <div className="comprar">
        <div id="detalhes">
            <img src={produto?.imagem} alt="Produto"/>	
            <p id="preco">Preço: {produto?.valor}</p>
        </div>
        <Link to="/loja/cart" id="comprar" onClick={() => addToCart(produto)}><span className="material-symbols-outlined" >shopping_cart</span> Comprar</Link>
        <ol id="descricao_bar" onClick={handleOpenDesc}>
            <li>Descrição do produto</li>
            <li id="dropdown" className="material-symbols-outlined">expand_more</li>
        </ol>
            {openDesc && <div id="descricao">{produto?.descricao}</div>}
    </div>
    </section>
    </>
    )
}
export default Compra;

