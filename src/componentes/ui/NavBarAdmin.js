import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

import logo from "../../styles/assets/img/sitio/deepdaemon.png";


export const NavBarAdmin = () => {


	const dispatch = useDispatch();
	const history = useNavigate();

	const handleLogout = () => {
		dispatch(startLogout());
		history.replace('/');

	}


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
						to="/admin/members"
					>
						Colaboradores
					</NavLink>

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
					{/* <NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/admin/other"
					>
						Otros
					</NavLink> */}
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
						Tecnolog??as
					</NavLink>
				</div>
			</div>

			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
				<ul className="navbar-nav ml-auto">
					<button
						className="nav-item nav-link btn"
						onClick={handleLogout}

					>
						Salir
					</button>
				</ul>
			</div>
		</nav>
	)
}
