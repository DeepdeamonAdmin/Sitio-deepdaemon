//Uso de React
import React from "react";

//Uso de NavLink y Link para la navegación en el sitio
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

//Componentes necesarios
import logo from "../../styles/assets/img/sitio/deepdaemon.png";

export const NavBar = () => {

  //Despliegue del navbar general 
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="navbar">
      <NavLink to="/">
        <img src={logo} style={{ width: "30px" }} alt="logo" />
      </NavLink>
      <NavLink to="/" className="navbar-brand mb-0">
        {" "}
        Lab. CCC{" "}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link
            activeClass="active"
            className="nav-item nav-link"
            to="Nosotros"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Nosotros
          </Link>
          <Link
            activeClass="active"
            className="nav-item nav-link"
            to="Lideres"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Lideres
          </Link>
          <Link
            activeClass="active"
            className="nav-item nav-link"
            to="Proyectos"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Proyectos
          </Link>
          <Link activeClass="active"
						className="nav-item nav-link"
						to='Publicaciones'
						spy={true}
						smooth={true}
						offset={-70}
						duration={500}>
						Publicaciones
					</Link>
          <Link
            activeClass="active"
            className="nav-item nav-link"
            to="Equipo"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Equipo
          </Link>
          <Link
            activeClass="active"
            className="nav-item nav-link"
            to="Contacto"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Contacto
          </Link>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <NavLink
              to="/registrer"
              className="btn btn-outline-secondary nav-item nav-link"
            >
              Registrar
            </NavLink>
            <NavLink
              to="/login"
              className="btn btn-outline-secondary nav-item nav-link"
            >
              Iniciar Sesión
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};
