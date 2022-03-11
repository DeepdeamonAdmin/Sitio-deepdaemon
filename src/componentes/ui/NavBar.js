import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from "react-scroll";

import logo from "../../styles/assets/img/sitio/deepdaemon.png";

export const NavBar = () => {
    
 
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="navbar">
            <NavLink to="Home">
                <img src={logo} style={{ width: "30px" }} alt="logo" />
            </NavLink>
            <NavLink to="/" className="navbar-brand"> DeepDaemon </NavLink>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link activeClass="active"
                        className="nav-item nav-link"
                        to='Nosotros'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                            Nosotros
                    </Link>

                    <Link activeClass="active"
                        className="nav-item nav-link"
                        to='Proyectos'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
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

                    <Link activeClass="active"
                        className="nav-item nav-link"
                        to='Lideres'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                            Lideres
                    </Link>

                    <Link activeClass="active"
                        className="nav-item nav-link"
                        to='Equipo'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                            Equipo
                    </Link>
                    <Link activeClass="active"
                        className="nav-item nav-link"
                        to='Contacto'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                            Contacto
                    </Link>
                    <NavLink exact activeClassName="active" to="/login" className="nav-item nav-link"> Login</NavLink>
                </div>
            </div>
        </nav>
    )
}
