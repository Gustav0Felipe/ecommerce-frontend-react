import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../hooks/api";


export function Perfil(){
    const { user, userLogout } = useContext(UserContext);
	
	const disableAccount = async () => {
		console.log(user.id_user);
		const response = await axios.delete(API_URL + "/usuarios/desativar/" + user.id_user, {
			headers : {
				'Authorization' : user.token
			}
		})
		userLogout();
		alert("Sua conta foi desativada, ao tentar logar novamente sera enviado um Link de reativação para seu E-mail.")
		return response;
	}
    return(
    <>
	{(user == null || !user.id_user) && <Navigate to="/loja/login"></Navigate>}
	
    <Header></Header>
        <section id="section-principal">
		<div className="perfil">
			<span id="accountIcon" className="material-symbols-outlined">account_circle</span>
			<h1>Minha Conta</h1>
			<h2>Informações de Acesso</h2>
			<ol>
				<li className="perfilDados">Nome:</li>
				<li>{user.nome_user}</li>
				<li className="perfilDados">Email:</li>
				<li>{user.email}</li>
				<li className="perfilDados">Telefone:</li>
				<li>{user.telefone}</li>
				<li className="perfilDados">Cpf:</li>
				<li>{user.cpf}</li>
			</ol>
			<br/> 
			<Link to="/loja/perfil/editar"><button className="editButtons">EDITAR</button></Link> 
			<Link to="/loja/perfil/autenticar-senha"><button className="editButtons">MUDAR SENHA</button></Link>
			<button className="editButtons" onClick={userLogout}><span className="material-symbols-outlined" id="exitIcon">logout</span></button>
			<button className="editButtons" onClick= {disableAccount}>Desativar Conta</button>
		</div>
	    </section>
    </>
    )
}