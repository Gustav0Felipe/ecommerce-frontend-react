import { useForm } from "react-hook-form";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../hooks/api";


export function Cadastro(){   
    const { register, handleSubmit } = useForm();
    const [invalid, setInvalid] = useState(false);

    const registrateUser = (formValues : any) => {  
        const fetchValidation = async () => {
			try {
            	const response = await axios.post(API_URL + "/usuarios", formValues) //segundo parametro seriam headers
				return response;
			}catch(error)
			{
				setInvalid(true);
			}
        }
        fetchValidation();
    }

    return(
    <>  
    <Header></Header>
    <section id="section-principal">
		<div id="cadastro">
			<span id="createUserIcon" className="material-symbols-outlined">person_add</span>
			<h1>Criar Conta</h1>
			<p>Informe seus dados abaixo para criar sua conta</p>
			<form onSubmit={handleSubmit(registrateUser)}>
				<label htmlFor="nome">Nome: </label> 
				<input id="nome_user" {...register("nome_user")} type="text" maxLength={255} required placeholder="Nome"/>
				<label htmlFor="cpf">CPF: </label> 
				<input id="cpf" {...register("cpf")} type="text" maxLength={15} required placeholder="CPF *" /> 
				<label htmlFor="telefone">Telefone: </label> 
				<input id="telefone" {...register("telefone")} type="tel" required placeholder="Telefone"/> 
				<label htmlFor="email">Email: </label> 
				<input id="email" {...register("email")} type="email" maxLength={255} required placeholder="Email *"/> 
				<label htmlFor="senha">Senha: </label> 
				<input id="senha" {...register("senha")} type="password" minLength={8} required placeholder="Senha *" autoComplete="on"/>
				<input id="endereco" {...register("endereco")} type="text" minLength={8} required placeholder="Endereço *" autoComplete="on"/>
				<button id="cadastrar" type="submit">Enviar</button>
			</form>
			{invalid && <p className="mensagem"> Cliente já cadastrado.</p>}
		</div>
	</section>
    <Footer></Footer>
    </>

    );


}