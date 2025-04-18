import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Compra from "./pages/compra/Compra";
import Cart from "./pages/cart/Cart";
import { Perfil } from "./pages/perfil/Perfil";
import { Login } from "./pages/login/Login";
import { Cadastro } from "./pages/cadastro/Cadastro";
import { EditarPerfil } from "./pages/perfil/PerfilEditar";
import { AutenticarSenha } from "./pages/perfil/PerfilEditarSenhaAutenticar";
import { EditarSenha } from "./pages/perfil/PerfilEditarSenha";
import { AdminMenu } from "./pages/admin/Menu";
import { CadastrarProduto } from "./pages/admin/CadastrarProduto";
import { Pedidos } from "./pages/admin/Pedidos";
import { DetalhesDoPedido } from "./pages/admin/PedidoDetalhes";
import { CadastroVerificar } from "./pages/cadastro/CadastroVerificar";
import { Payment } from "./pages/payment/Payment";
import { CadastrarCategoria } from "./pages/admin/CadastrarCategoria";
import { EditarProduto } from "./pages/admin/EditarProduto";

function AppRoute( ){
   
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>                
                <Route path="/loja" element={<Home></Home>}></Route>

                <Route path="/loja/comprar/:id" Component={Compra}></Route> 

                <Route path="/loja/cart" Component={Cart}></Route>
                <Route path="/loja/cart/payment" Component={Payment}></Route>

                <Route path="/loja/login" Component={Login}></Route>
                <Route path="/loja/cadastro" Component={Cadastro}></Route>
                <Route path="/loja/cadastro/verificar/:code" Component={CadastroVerificar}></Route>
                <Route path="/loja/perfil" Component={Perfil}></Route>
                <Route path="/loja/perfil/editar" Component={EditarPerfil}></Route>
                <Route path="/loja/perfil/autenticar-senha" Component={AutenticarSenha}></Route>
                <Route path="/loja/perfil/editar-senha/:auth" Component={EditarSenha}></Route>

                <Route path="/loja/admin" Component={AdminMenu}></Route>
                <Route path="/loja/admin/cadastrar-categoria" element={<CadastrarCategoria></CadastrarCategoria>}></Route>
                <Route path="/loja/admin/cadastrar-produto" element={<CadastrarProduto></CadastrarProduto>}></Route>
                <Route path="/loja/admin/editar-produto/:id" Component={EditarProduto}></Route>
                <Route path="/loja/admin/pedidos" Component={Pedidos}></Route>
                <Route path="/loja/admin/pedidos/:pedidoId" Component={DetalhesDoPedido}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRoute;  
