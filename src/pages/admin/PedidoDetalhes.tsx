import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link, Navigate, useParams } from "react-router-dom";
import { usePedidoDetails } from "../../hooks/usePedidoDetails";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { usePedidoDetailsMutate } from "../../hooks/usePedidoDetailsMutate";

export function DetalhesDoPedido(){
	const { user } = useContext(UserContext);

	const { pedidoId } = useParams();
	const { mutate } = usePedidoDetailsMutate();

	const pedidoEProdutos = usePedidoDetails(pedidoId).data;
	var pedidoDetails : any;
	if(pedidoEProdutos != null){
		pedidoDetails = pedidoEProdutos[Object.keys(pedidoEProdutos)[0]].pedidosProdutosId.pedido
	}
	const finalizarPedido = () =>{
		mutate(pedidoId)
	}
    return(
    <>
    {user?.role != "ADMIN" && <Navigate to="/loja/login" replace={true}></Navigate> }
    <Header></Header>
    <section id="section-principal">
	<div>
		<table className="pedidos">
            <tbody>
				<tr className="pedido">
					<th scope="col">Pedido</th> 
					<th scope="col">Cliente</th> 
					<th scope="col">Data inicial</th> 
					<th scope="col">Data Final</th> 
					<th scope="col">Valor Total</th> 
					<th scope="col">Status</th> 
				</tr>
				{pedidoDetails != null &&
				<tr className="pedido">
				<td>{pedidoDetails.num_ped}</td> 
				<td>{pedidoDetails.usuario.nome_user}</td>
				<td>{pedidoDetails.data_inicial} </td>
				<td>{pedidoDetails.data_final} </td>
				<td>{pedidoDetails.valor_total} </td>
				<td>{pedidoDetails.status_ped}</td>
				</tr>
				}
				<tr></tr>
				<tr>
					<th scope="col">Codigo</th>
					<th scope="col">Produto</th>
					<th scope="col">Categoria</th>
					<th scope="col">Quantidade</th>
					<th scope="col">Valor</th>
					<th scope="col">Total</th>
				</tr> 
                { 
				pedidoEProdutos?.map((produto : any) => 
                <tr className="pedido" key={produto.pedidosProdutosId.pedido.num_ped + produto.pedidosProdutosId.produto.id_prod}>
                    <td>{produto.pedidosProdutosId.pedido.num_ped}</td>
					<td>{produto.pedidosProdutosId.produto.id_prod}</td>
					<td>{produto.pedidosProdutosId.produto.categoria.nome_cat}</td>
                    <td>{produto.qtd_prod}</td> 
                    <td>{produto.val_prod} </td>
					<td>{produto.qtd_prod * produto.val_prod}</td>
                </tr>
                )
                } 
				{pedidoDetails != null &&	
				<tr className="pedido">
					<th scope="row" colSpan={5}>Total: </th>
					<td>{pedidoDetails.valor_total}</td>
				</tr>
				} 
            </tbody>
		</table>
		
		<button onClick={finalizarPedido}>
			<Link to={"/loja/admin/pedidos/" + pedidoId}>	Finalizar Pedido</Link>
		</button>
		
		<button>
		<Link to={"/loja/admin/pedidos"} className="material-symbols-outlined">
				arrow_back
		</Link>
		</button>
    </div>
	</section>
    </>
    )
}