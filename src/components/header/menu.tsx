import { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import JavaIcon from '../../assets/favicon.ico'
import { UserContext } from '../../context/userContext';

function Menu (){
	
	const [menu, setMenu] = useState(false);
	const { user } = useContext(UserContext);

	const handleResize = () => {

		if(window.innerWidth >= 769){
			setMenu(true);
		}else{
			setMenu(false);
		}
	}

	const handleClick = () => {
		if (this.state.open) {
			setMenu(false);
		}else{
            setMenu(true);
        }
	};
	
		window.addEventListener("resize", handleResize);
		if(!menu && window.innerWidth < 769){
			return(
                <><span id="burguer" className="material-icons" onClick={handleClick}>menu</span></>
            )
		}
		return(
        <>
            <span id="burguer" className="material-icons" onClick={handleClick}>menu</span>
			<Link to="/loja/"><img alt="Icone do Java" src={JavaIcon} id="logo"/></Link>
			<nav id="menu">
				<ul>
					<li><Link to={"/loja/"}> Ofertas do Dia </Link></li>
					<li><Link to={"/loja/login"}> Entre </Link></li>
					<li><Link to={"/loja/perfil"}> Minha conta </Link></li>
					<li><Link to={"/loja/cadastro"}> Crie a sua conta </Link></li>
					<li><Link to={"/loja/cart"}>
							<span id="cart" className="material-symbols-outlined">shopping_cart</span> 
						</Link>
					</li>
					{
					user.role == "ADMIN" && 
					<li><Link to="/loja/admin">Admin</Link></li> 
					}
				</ul>
			</nav>
        </>
        	);
	}

export default Menu;
