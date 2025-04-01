import { Link } from 'react-router-dom'
import './catalog.css'

interface CatalogProps {
    id: any,
    nome: string, 
    imagem: string,
    valor: number
}

export function Catalog({id, nome, imagem, valor} : CatalogProps){
    return(
    <>
        <Link to={"/loja/comprar" + "/" + id} ><img src={imagem} alt={nome}/></Link>
        <h2>{nome}</h2>
        <span>Valor: {valor}</span>
    </>
    )
}
