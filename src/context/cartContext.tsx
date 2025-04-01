import { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import axios from 'axios';
import { Pedido } from '../interface/PedidoDto';
import { OrderProduct } from '../interface/OrderProduct';
import { API_URL } from '../hooks/api';
import { ProductData } from '../interface/ProductData';
import { ProductDataDto } from '../interface/ProductDataDto';
import { useProductData } from '../hooks/useProductData';


export const CartContext = createContext<any>('');

export const CartProvider = ({ children } : any) => {

    var check : any = 0;
    if(localStorage.getItem("cartItems") != null){
        check = localStorage.getItem("cartItems");
    }else{
        check = "";
    }

  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState<any>(localStorage.getItem('cartItems') ? JSON.parse(check) : []);
  const { data } = useProductData(); 

  const cartIsEmpty = () : boolean => {
    if(cartItems.length <= 0){
      return true;
    }else{
      return false;
    }
  }

  const addToCart = (item : ProductData) => {
    if(!item.enabled){
      return null;
    }else{
      const isItemInCart = cartItems.find((cartItem : any) => cartItem.id_prod === item.id);
      
      if (isItemInCart) {
        setCartItems(
          cartItems.map((cartItem : OrderProduct) =>
            cartItem.id_prod === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
            )
        );
      } else {
        setCartItems([...cartItems, { ...item, id_prod: item.id, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (item : ProductData) => {
    const isItemInCart = cartItems.find((cartItem : any) => cartItem.id_prod === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem : any) => cartItem.id_prod !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem : OrderProduct) =>
          cartItem.id_prod === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };
  const deleteFromCart = (item : ProductData) => {
    const isItemInCart = cartItems.find((cartItem : any) => cartItem.id_prod === item.id);

    if (isItemInCart.quantity > 0 ) {
      setCartItems(cartItems.filter((cartItem : any) => cartItem.id_prod !== item.id));
    } 
  };

  const removeDisabledItemFromCart = () => {
    setCartItems(cartItems.filter((cartItem : any) => 
        data?.find((product : ProductData) => product.id === cartItem.id_prod).enabled == true)
        );
    }

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () : number => {
    return cartItems.reduce((total: number, item: { valor: number; quantity: number; }) => total + item.valor * item.quantity, 0);
  };

  const calculoFrete = (cep: string) =>{
    var items : OrderProduct[] = cartItems.map((item: { id: number; quantity: number; }) => {
      return {
        id_prod: item.id, 
        quantity: item.quantity
      }
    });
    const pedido : Pedido = {
      usuario: user,
      produtos: items,
      cep: cep,
      selectedEnvio: 0
    }
    if(pedido != null && cartItems.length > 0 && user){
      const fetchData = async () => {
        const response = await axios.post(API_URL + "/pedidos/calcular-frete", pedido, {
          headers:{
            'Authorization': user.token
          }
        })
      return response
      }
      return fetchData()
    }
  }

  const updateOrder = (cep : string, selectedEnvio: number) =>  {
    var items : OrderProduct[] = cartItems.map((item: { id: any; quantity: any; }) => {
      return {
       id_prod: item.id, 
       quantity: item.quantity
      }
    });
    const pedido : Pedido = {
      usuario: user,
      produtos: items,
      cep: cep,
      selectedEnvio: selectedEnvio
    }
    if(pedido != null && cartItems.length > 0 && user){
      console.log(pedido)
    const fetchData = async () => {
      const response = await axios.post(API_URL + "/pedidos", pedido, {
        headers:{
          'Authorization': user.token
        }
      
      }) 
      setCartItems([]);
      return response;
      }
    const response = fetchData();
    return response;
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        removeDisabledItemFromCart,
        clearCart,
        getCartTotal,
        updateOrder,
        calculoFrete,
        cartIsEmpty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};