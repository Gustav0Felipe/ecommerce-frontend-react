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
        <Link to={"/comprar" + "/" + id} ><img src={imagem}/></Link>
        <h2>{nome}</h2>
        <p>Valor: {valor}</p>
    </>
    )
}
