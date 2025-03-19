import { useContext } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../hooks/api";



export function EditarPerfil(){
    const { user, userLogin } = useContext(UserContext);
	const { register, handleSubmit } = useForm(); 
	const navigate  = useNavigate();
	const updateUserData =  async (formValues : any) => {   
            const response = await axios.put(API_URL + "/usuarios/atualizar", formValues, {
				headers: {
				  'Authorization': user.token
				}
			  });
			userLogin(response.data); 
			  navigate("/loja/perfil")
            return response;
    }
   
    return(
        <>
        <Header></Header>
        <section id="section-principal">
		<div id="cadastro">
			<span id="accountIcon" className="material-symbols-outlined">account_circle</span>
			<h1>Alterar meus dados</h1>
			<p>É possivel alterar apenas Nome e Telefone.</p>
			<form name="formEditar" onSubmit={handleSubmit(updateUserData)}>
					<input id="token" {...register("token")} type="hidden" required  value={user.token}/>
					<input id="id_user" {...register("id_user")} type="hidden" required  value={user.id_user}/>
					<label htmlFor="nome_user">Nome: </label>
					<input id="nome_user" {...register("nome_user")} type="text" maxLength={255} required placeholder="Nome" defaultValue={user.nome_user}/>
					
					<label htmlFor="telefone">Telefone: </label>
					<input id="telefone" {...register("telefone")} type="tel" required placeholder={user.telefone} defaultValue={user.telefone}/>
					
					<label htmlFor="endereco">Endereço </label>
					<input id="endereco" {...register("endereco")} type="text" required maxLength={255} placeholder="Endereço *" value={user.email} readOnly={true}/>
					
					<button id="editar" type="submit">Confirmar</button>
			</form>
		</div>
	    </section>
        <Footer></Footer>
        </>
    )
}