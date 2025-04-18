import { useContext } from "react"
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Navigate, useParams } from "react-router-dom";
import { API_URL } from "../../hooks/api";


export function EditarSenha(){
    const { user, userLogin } = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    var { auth } = useParams();
    console.log(auth)
    console.log(window.sessionStorage.getItem("token"))
    var autorizar = false;
    if(auth == "auth=" + window.sessionStorage.getItem("token")){
        autorizar = true;
    }else{
        autorizar = false;
        window.sessionStorage.removeItem("token");
    } 
    
    const passEdit = async (formValues : any) => {  
        console.log(formValues)
        const response = await axios.put(API_URL + "/usuarios/editar-senha", formValues, {
            headers: {
                'Authorization': user.token
            }
        }) 
        userLogin(response.data);
        window.sessionStorage.removeItem("token");
        console.log(response);
    }

    return(
    <>
    
    <Header></Header>
    <section id="section-principal">
		<div className="base">
			<span id="accountIcon" className="material-symbols-outlined">account_circle</span>
            {
            autorizar && <h1>Meus dados</h1> && <form className="formDados" onSubmit={handleSubmit(passEdit)}>
                <input id="id_user" {...register("id_user")} type="hidden" required  value={user.id_user}/>
                <input id="nome_user" {...register("nome_user")} type="hidden" maxLength={255} required placeholder="Nome" value={user.nome_user}/>
                <input id="email" {...register("email")} type="hidden" required  value={user.email}/>
				<label htmlFor="senha">Nova senha: </label> 
                <input id="senha" {...register("senha")} type="password" required maxLength={100}
					placeholder="Nova Senha *" />

				<button id="editar" type="submit">Enviar</button>
			</form> 
            } 
            {!autorizar && <Navigate to="/loja/perfil"></Navigate>}
		</div>
	</section>
    </>
    )
}