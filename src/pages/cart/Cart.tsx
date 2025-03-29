import { useContext, useRef, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import { Footer } from '../../components/footer/footer'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { useForm } from 'react-hook-form'
import { Dialog } from '@mui/material'

export default function Cart () {
  const ref = useRef<HTMLDivElement>(null);

  const { cartItems, addToCart, removeFromCart, deleteFromCart, clearCart, getCartTotal, calculoFrete } = useContext(CartContext)
  const { user } = useContext(UserContext);
  const { register, handleSubmit } = useForm();

  const[menuFreteOpen, setMenuFrete] = useState<boolean>(false);
  const[opcoesFrete, setOpcoesFrete] = useState<any>(null);
  const[selectedEnvio, setSelectedEnvio] = useState<any>(null);
  const[valorFrete, setValorFrete] = useState<number>(0);

  const handleMenuFreteOpen = () => {
    setMenuFrete(prev => !prev);
  }

  const handleCalculoFrete = async (e: any) => {
    const cep : string = e.cep;
    if(cep.trim.length == 0){
      return null; 
    }else{ 
      const response = await calculoFrete(e.cep);
      window.sessionStorage.setItem("cep", e.cep);
      setOpcoesFrete(response.data.formas);
      handleMenuFreteOpen();
      return response;
    }

  }

  const setMetodoEntrega = async () =>  {
    if(selectedEnvio && selectedEnvio.target.value){
      window.sessionStorage.setItem("selectedEnvio", selectedEnvio.target.value.toString().split(" ")[0]);
      setValorFrete(selectedEnvio.target.value.toString().split(" ")[3])
      
      handleMenuFreteOpen();
    }
  }
  return (
    <>    
    <Header></Header>
    <section className='cart'>    
    <div id="resumo">
      <h1><span className="material-symbols-outlined">shopping_cart</span> MEU CARRINHO</h1>
      <h2>Resumo</h2>
      {
          cartItems.length > 0 ? (
      <p>Total: {(Number.parseFloat(getCartTotal()) + Number.parseFloat(valorFrete.toString())).toFixed(2)}</p> ) : (
        <h3>Você não tem itens no Carrinho.</h3>
      )}
    </div>
      <div>
        <div id="carrinho">
          <h3>Produto</h3>
          <ol id="carrinho_list">
          {cartItems.map((item : any) => (
            <li key={item.id}>
              <p className="prod_name">{item.nome}</p>
              <img className="miniatura_produto" src={item.imagem} alt={item.nome}/>
              <p>
              <button
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                <span>+</span>
                </button>
                {item.quantity}
                <button 
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                <span>-</span>
                </button>
                <button type="button" onClick={() => {deleteFromCart(item)}}><span className="material-symbols-outlined">delete</span></button>
              </p>
            </li>
          ))}  
          </ol>
          

          <button className="button_medio" onClick={() => {clearCart()}}>
            Clear cart
          </button>
          {cartItems.length > 0 &&
          <form id="calculo_frete" onSubmit={handleSubmit(handleCalculoFrete)}>
            <label htmlFor="cep">Frete e Prazos</label>
            <input id="cep" type="cep" {...register("cep")} maxLength={9} autoComplete='on'></input>
            <button type="submit" id="button_frete">
            <p>Calcular Cep</p> 
              <span id="frete_icon" className="material-symbols-outlined">local_shipping</span>
            </button>
          </form>
          }

        </div>
        
        
      </div>
      { menuFreteOpen && 
          <Dialog 
          open
          ref={ref}>
          <div className="prompt">
            <p>Opções de Frete: </p>
            <button className="fechar" type="button" onClick={handleMenuFreteOpen}>X</button>
            <select onChange={setSelectedEnvio}>
              <option value="" >Escolha uma Opção: </option>
            {
                opcoesFrete.map((f: any) => (
                  <option key={f.id} id={f.id}
                  >
                    {f.id} {f.company} {f.name} {f.price}
                    </option>
                ))
              }
              </select>
              <button type="button" id="confirmar" onClick={setMetodoEntrega}>Confirmar</button>
          </div>

        </Dialog>
      }

      <div id="finalizarDiv">
        {
        cartItems.length == 0 ||

        user.length == 0 && 
        <Link to="/loja/login" ><span id='finalizar' className='material-symbols-outlined'>shopping_cart FINALIZAR PEDIDO</span></Link>
        ||
        <Link to="/loja/cart/payment" ><span id='finalizar' className='material-symbols-outlined'>shopping_cart FINALIZAR PEDIDO</span></Link> 
        }
      </div>
      </section>
      <Footer></Footer>
      </>
    )
}
