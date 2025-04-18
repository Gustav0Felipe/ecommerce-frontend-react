import { Categoria } from "./Categoria";

export interface ProductDataDto {
    imagem: string, 
    nome: string, 
    descricao : string,
    custo: number | undefined,
    valor: number | undefined,
    estoque: number | undefined,
    categoria: Categoria,
    peso_kg: number | undefined,
    comprimento_cm: number | undefined, 
    altura_cm: number | undefined,
    largura_cm: number | undefined

}