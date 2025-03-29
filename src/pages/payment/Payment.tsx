import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

export function Payment(){
    const { updateOrder, cartItems } = useContext(CartContext)
    const { user } = useContext(UserContext);
    const [ pix, setPix ] = useState<any>(null);

    const navigate = useNavigate();

    const [handleRedirect, setRedirect] = useState(false);
    
    useEffect(() => {
        if(window.sessionStorage.getItem("selectedEnvio") == null){
            alert("Selecione um Método de Entrega ao Calcular Cep");
            navigate("/loja/cart");
        }else{

            const fetchData = async () => {
                if(cartItems.length > 0){
            const response = await updateOrder(window.sessionStorage.getItem("cep"), window.sessionStorage.getItem("selectedEnvio"));
                if(response){
                    setPix(response.data)
                    return response.data;
                }
            }else{
                setRedirect(true)
            }
        }
        fetchData();
        }
        
    }, []);

    const copyButton = (valor : string)=> {
        navigator.clipboard.writeText(valor);
      };
    return (
        <>
        {(user == null || !user.id_user) && <Navigate to="/loja/login"></Navigate>}
        {handleRedirect && <Navigate to="/loja/cart"></Navigate>}
        <Header></Header>
        <section id="section-principal">
            <div className="pagamento">
            <h1>Pix : </h1>
            <img src={pix?.QRCode}></img>
            <ol>
            <li>
                <p>Preço: {pix?.valor.original}</p>
            </li>
            <li>   
                <p>Chave: {pix?.Chave}</p> 
                <button onClick={() => {copyButton(pix?.Chave)}} id="copiar" className="material-symbols-outlined">
                    content_copy
                </button>
            </li>
            </ol>
            </div>
        </section>
        <Footer></Footer>
        </>
    );
}