//Uso de React
import React, { useState } from 'react';

//Uso de Link, NavLink y useNavigate para la navegación en el sitio
import { Link } from 'react-scroll';
import { NavLink, useNavigate } from 'react-router-dom';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Componentes necesarios
import { startLogout } from '../../actions/auth';
import logo from '../../styles/assets/img/sitio/deepdaemon.png';
import BurguerButton from './BurgerButton';

export const NavBarMobileAuth = () => {
  //Declaración del hook y función para los clics en los links
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Declaración del useNavigate
  const history = useNavigate();

  //Función del cierre de sesión
  const handleLogout = () => {
    //Enviar al estado el cierre de sesión
    dispatch(startLogout());
    history('/', { replace: true });
  };

  //Obtener los datos del estado
  const { datos } = useSelector((state) => state.user);
  let nombre;
  if (datos) nombre = datos.nombre;

  //Despliegue de la navbar en la versión mobile
  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark d-flex"
        id="navbar"
      >
        <div>
          <NavLink to="/">
            <img src={logo} style={{ width: '30px' }} alt="logo" />
          </NavLink>
          <NavLink to="/" className="navbar-brand mb-0">
            Lab. CCC
          </NavLink>
        </div>
        <div className={`links_mobile ${clicked ? 'active' : ''}`}>
          <div
            className="navbar-collapse"
            id="navbarNavAltMarkup"
            style={{ justifyContent: 'center' }}
          >
            <div
              className="navbar-nav"
              id="links_items_mobile"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Link
                activeClass="active"
                className="nav-item"
                to="/Nosotros"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={handleClick}
              >
                Nosotros
              </Link>
              <Link
                activeClass="active"
                className="nav-item"
                to="Lideres"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={handleClick}
              >
                Lideres
              </Link>
              <Link
                activeClass="active"
                className="nav-item"
                to="Proyectos"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={handleClick}
              >
                Proyectos
              </Link>
              <Link
                activeClass="active"
                className="nav-item"
                to="Equipo"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={handleClick}
              >
                Equipo
              </Link>
              <Link
                activeClass="active"
                className="nav-item"
                to="Contacto"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={handleClick}
              >
                Contacto
              </Link>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="btn nav-item btn-dark text-white mt-0 pt-0 btn-xl col-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="nav-item"
          style={{ position: 'absolute', right: '10px' }}
        >
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
      </nav>
      <div>
        <div className={`burguermenu ${clicked ? 'active' : ''}`}></div>
      </div>
    </>
  );
};
