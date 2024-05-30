//Uso de React
import React from 'react';

//Uso de NavLink, Link y useNavigate para la navegación en el sitio
import { NavLink, Link, useNavigate } from 'react-router-dom';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Componentes necesarios
import { startLogout } from '../../actions/auth';
import logo from '../../assets/deepdaemon.png';

export const NavBarUser = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Declaración del useNavigate
  const navigate = useNavigate();

  //Función para el cierre de sesión
  const handleLogout = () => {
    //Enviar al estado el cierre de sesión
    dispatch(startLogout());
    navigate('/', { replace: true });
  };

  //Obtención de los datos del estado
  const { datos } = useSelector((state) => state.user);
  let nombre;
  if (datos) {
    nombre = datos.nombre;
  }

  //Despliegue de la navbar de los alumnos
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <img src={logo} style={{ width: '100px' }} alt="logoLiconApp" />
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/alumno">
            DeepDaemon
          </NavLink>
        </div>
      </div>
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/alumno/tesis">
            Tesis
          </NavLink>
          <NavLink className="nav-item nav-link" to="/alumno/publicaciones">
            Publicaciones
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/alumno/galery"
          >
            Galeria
          </NavLink>
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <Link
            to="/alumno/perfil"
            className="btn btn-outline-secondary nav-item nav-link"
          >
            {nombre}
          </Link>
        </ul>
        <ul>
          <button
            className="btn btn-outline-primary nav-item btnLogout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
