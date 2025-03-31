import { Link, Navigate } from "react-router-dom";
import Header from "../../components/header/header";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";


export function AdminMenu(){

    const { user, userLogout } = useContext(UserContext);

    console.log(user.role)
    return(
    <>
    {user?.role != "ADMIN" && <Navigate to="/loja/login" replace={true}></Navigate> }

    <Header></Header>
    <section id="section-principal-admin">
	<h1>Menu de gerenciamento</h1>
		<ol id="adminOptions">
            <li><Link to="/loja/admin/cadastrar-categoria"><button>Cadastrar Categoria</button></Link></li>
			<li><Link to="/loja/admin/cadastrar-produto"><button>Cadastrar Produto</button></Link></li>
			<li><Link to="/loja/admin/pedidos"><button>Listar Pedidos</button></Link></li>
			<li><Link to="/loja/login"><button onClick={userLogout}><span className="material-symbols-outlined" id="exitIcon">logout</span></button></Link></li>
		</ol>
    </section>
    </>
    )
}