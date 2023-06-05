import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import logo from "../../assets/deepdaemon.png";


export const NavBarUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(startLogout());
        navigate('/', {replace: true});
    }

    const { datos }  = useSelector( state => state.user );
    let nombre;
    if(datos){
        nombre = datos.nombre
    }

    

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <img src={logo} style={{ width: "100px" }} alt="logoLiconApp" />
        <div className="navbar-collapse">
            <div className="navbar-nav">
                <NavLink
                    className="nav-item nav-link"
                    to='/user'> 
                        DeepDaemon 
                </NavLink>
            </div>
        </div>
      
        <div className="navbar-collapse">
            <div className="navbar-nav">
                <NavLink 
                    className="nav-item nav-link"
                    to="/user/tesis">
                        Tesis
                </NavLink>
                <NavLink 
                    className="nav-item nav-link" 
                    to="/user/publicaciones">
                        Publicaciones
                </NavLink>
                <NavLink 
                    className="nav-item nav-link" 
                    to="/user/blog">
                        Blog
                </NavLink>
            </div>    
        </div>
        

    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <Link
                to ='/user/perfil'
                className="btn btn-outline-secondary nav-item nav-link"

            >
                { nombre }
            </Link>
        </ul>
        <ul>
          <button 
             className="btn btn-outline-primary nav-item btnLogout"
            onClick={ handleLogout }>
              Logout
          </button>
        </ul>
    </div>
  </nav>
  )
}
