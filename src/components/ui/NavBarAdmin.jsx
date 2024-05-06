//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso de NavLink, Link y useNavigate para la navegación en el sitio
import { NavLink, Link, useNavigate } from 'react-router-dom';

//Componentes necesarios
import { startLogout } from '../../actions/auth';
import logo from "../../styles/assets/img/sitio/deepdaemon.png";

export const NavBarAdmin = () => {

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Declaración del useNavigate
	const history = useNavigate();

	//Función para manejar el cierre de sesión
	const handleLogout = () => {

		//Envio al estado el cierre de sesión
		dispatch(startLogout());
		history('/', {replace: true});

	}

	//Despliegue del navbar de los administradores
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="navbar">
			<Link to="/admin">
				<img src={logo} style={{ width: "30px" }} alt="logo" />
			</Link>
			<Link to="/admin" className="navbar-brand"> DeepDaemon </Link>

			<div className="navbar-collapse">
				<div className="navbar-nav">
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/projects"
					>
						Proyectos
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/release"
					>
						Publicaciones
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/galery"
					>
						Galeria
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/alumnos"
					>
						Alumnos
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/externos"
					>
						Externos
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/tesis"
					>
						Tesis
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/lideres"
					>
						Lideres
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/avisos"
					>
						Avisos
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/Instituciones"
					>
						Instituciones
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/Carreras"
					>
						Carreras
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/Tecnologias"
					>
						Tecnologías
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/YouTube"
					>
						YouTube
					</NavLink>
				</div>
			</div>
			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
				<ul className="navbar-nav ml-auto">
					<button
						className="btn btn-outline-primary nav-item btnLogout"
						onClick={handleLogout}

					>
						Logout
					</button>
				</ul>
			</div>
		</nav>
	)
}
