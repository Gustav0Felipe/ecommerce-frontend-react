import { ChangeEvent, useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useProductMutate } from "../../hooks/useProductDataMutate";
import { ProductDataDto } from "../../interface/ProductDataDto";
import { Navigate, useNavigate } from "react-router-dom";
import { Categoria } from "../../interface/Categoria";


const Input = ({id, name, label, inputValue, maxlength, type, placeholder, updateValue} : any) => {
    return(
        <>
        <label htmlFor={name}>{label}</label>
        <input id={id} name={name} value={inputValue} type={type} maxLength={maxlength} required placeholder={placeholder} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CadastrarProduto(){

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [custo, setCusto] = useState(undefined);
    const [valor, setValor] = useState(undefined);
    const [estoque, setEstoque] = useState(undefined);
    const [categoria, setCategoria] = useState<Categoria>({cod_cat: 1, descricao: "", nome_cat: ""});
    const [imagem, setImagem] = useState("");
    const [peso , setPeso] = useState(undefined);
    const [comprimento , setComprimento] = useState(undefined);
    const [altura , setAltura] = useState(undefined);
    const [largura , setLargura] = useState(undefined);

    const { mutate } = useProductMutate();

   
    const submit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        
        const productData : ProductDataDto = {
            imagem: imagem,
            nome: nome,
            descricao: descricao,
            custo: custo,
            valor: valor,
            estoque: estoque,
            categoria: categoria,
            peso_kg: peso,
            comprimento_cm: comprimento, 
            altura_cm: altura,
            largura_cm: largura
        }
        mutate(productData);

        navigate("/");
    }


    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
 
        if (name === 'categoria') {
            setCategoria({
                ...categoria,
                    cod_cat: parseInt(value),
                    nome_cat: "",
                    descricao: ""

                },
            );
        }
           
    }

    return (
    <>
    {window.sessionStorage.getItem("isAdmin") != "true" && <Navigate to="/loja/login"></Navigate> }
    <Header></Header>
    <section id="section-principal">
        <div id="cadastro">
            <span id="createUserIcon" className="material-symbols-outlined">person_add</span>
            <h1>Novo produto: </h1>
            <form className="formDados" onSubmit={submit}>
                        
                <Input label="Nome: " id="nome" name="nome" inputValue={nome} updateValue={setNome} type="text" maxlength={255} placeholder="Nome"/>
                
                <Input label="Descrição: " id="descricao" name="descricao" inputValue={descricao} updateValue={setDescricao} maxlength={255} placeholder="descrição"/>
                
                <Input label="Custo: " id="custo" name="custo" inputValue={custo} updateValue={setCusto} type="number" maxlength={10} placeholder="Custo *" autoComplete={"on"}/>
                
                <Input label="Valor: " id="valor" name="valor" inputValue={valor} updateValue={setValor} type="number" maxlength={10} placeholder="Valor *"/>
                
                <Input label="Estoque Inicial: " id="estoque" name="estoque" inputValue={estoque} updateValue={setEstoque} type="number" maxlength={10} placeholder="Estoque *"/>
                
                <label htmlFor="categoria">Categoria: </label>
                <input id={"categoria"} name={"categoria"} value={categoria.cod_cat || ''} type={"number"} required placeholder={"Categoria *"} onChange={atualizarEstado}></input>

                <Input label="Imagem: " id="imagem" name="imagem" inputValue={imagem} updateValue={setImagem} type="text" maxlength={255} placeholder="Imagem *"/>
            
                <Input label="Peso(kg): " id="peso_kg" name="peso_kg" inputValue={peso} updateValue={setPeso} type="text" maxlength={255} placeholder="Peso *"/>

                <Input label="Comprimento(cm): " id="comprimento_cm" name="comprimento_cm" inputValue={comprimento} updateValue={setComprimento} type="text" maxlength={255} placeholder="Comprimento *"/>

                <Input label="Altura(cm): " id="altura_cm" name="altura_cm" inputValue={altura} updateValue={setAltura} type="text" maxlength={255} placeholder="Altura *"/>

                <Input label="Largura(cm): " id="largura_cm" name="largura_cm" inputValue={largura} updateValue={setLargura} type="text" maxlength={255} placeholder="Largura *"/>
      
            <button id="cadastrar" type="submit">Enviar</button>
            </form>
        </div>
    </section>
    <Footer></Footer>
    </>
    );
    
}