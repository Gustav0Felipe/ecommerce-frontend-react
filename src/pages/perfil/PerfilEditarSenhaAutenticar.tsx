import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { API_URL } from "../../hooks/api";


export function AutenticarSenha(){
    const { user } = useContext(UserContext);
    const { register, handleSubmit } = useForm();


    console.log(window.sessionStorage.getItem("token"));

    const [openMessage, setOpenMessage] = useState(false);

    const handleOpenDesc = () =>{
        setOpenMessage(prev => !prev);
    }

    const passEdit = async (formValues : any) => {  
        const response = await axios.post(API_URL + "/usuarios/email-alterar-senha", formValues,{
            headers: {
                'Authorization': user.token
            }
        }) //segundo parametro seriam headers
        console.log(response);
        if(response.data.length == 0){
            alert("Senha Invalida.");
        } else{
            window.sessionStorage.setItem("token", response.data)
            handleOpenDesc()
        }
    }

    return(
    <>
    <Header></Header>
    <section id="section-principal">
		<div className="base">
			<span id="accountIcon" className="material-symbols-outlined">account_circle</span>

			<h1>Confirme a sua senha atual</h1>

            {!openMessage &&
			<form className="formDados" onSubmit={handleSubmit(passEdit)}>
                <input id="id_user" {...register("id_user")} type="hidden" required  defaultValue={user.id_user}/>
                <input id="nome_user" {...register("nome_user")} type="hidden" required  defaultValue={user.nome_user}/>
                <input id="email" {...register("email")} type="hidden" required  defaultValue={user.email}/>
				<label htmlFor="senha">Sua senha atual: </label> 
                <input id="senha" {...register("senha")} type="password" required maxLength={100}
					placeholder="Sua Senha *" autoComplete="on" />

				<button id="editar" type="submit">Enviar</button>
			</form>
            }
            {openMessage && <p>Enviamos um pedido de confirmação para seu Email!</p>}
		</div>
	</section>
    </>
    )
}