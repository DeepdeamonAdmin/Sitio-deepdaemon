//Uso de React
import React from "react";

//Uso de Link, NavLink y useNavigate para la navegación en el sitio
import { Link } from "react-scroll";
import { NavLink, useNavigate } from 'react-router-dom';

//Uso de Redux
import { useDispatch,  useSelector} from 'react-redux';

//Componentes necesarios
import { startLogout } from '../../actions/auth';
import logo from "../../styles/assets/img/sitio/deepdaemon.png";

export const NavBarExterno = () => {

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

  //Obtención de los datos del estado
  const { datos }  = useSelector( state => state.user );
  let nombre;
  if(datos){
      nombre = datos.nombre
  }
  
  //Despliegue del navbar de los externos
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
        <span class="navbar-toggler-icon"></span>
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
            to="Proyectos"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Proyectos
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
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <Link
                to ='/externo/perfil'
                className="btn btn-outline-secondary nav-item nav-link"
            >
                { nombre }
            </Link>
        </ul>
        <ul>
          <button 
            className='btn btn-outline-primary nav-item btnLogout'
            onClick={ handleLogout }>
              Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
