//Uso de React
import React, {useState} from "react";

//Uso de Link y NavLink para la navegación en el sitio
import { Link } from "react-scroll";
import { NavLink } from 'react-router-dom';

//Componentes necesarios
import logo from "../../styles/assets/img/sitio/deepdaemon.png";
import BurguerButton from "./BurgerButton";

export const NavBarMobileSinAuth = () => {

    //Configuración de hook para verificar el clic y el estado
    const [clicked,setClicked] = useState(false);
    const [omed,setOmed] = useState(false);

    //Función para manejar el cicl
    const handleClick = () =>{
        setClicked(!clicked)
    }

    //función para manejar el menú
    const handleMenu = () =>{
        if(omed==false)setOmed(!omed)
    }

    //Despliegue de la navbar sin autenticación en la versión mobile
    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex" id="navbar">
            <div>
                <NavLink to="/">
                    <img src={logo} style={{ width: "30px" }} alt="logo" />
                </NavLink>
                <NavLink to="/" className="navbar-brand mb-0">
                    Lab. CCC
                </NavLink>
            </div>
            <div className={`links_mobile ${clicked ? 'active' : ''}`}>
                <div className="navbar-collapse" id="navbarNavAltMarkup" style={{justifyContent:"center"}}>
                    <div className="navbar-nav" id="links_items_mobile" style={{display: "flex", flexDirection:"column"}}>
                        {(omed)?
                            <NavLink
                                activeClass="active"
                                className="nav-item nav-link text-white mt-0 pt-0 pb-0"
                                to="/"
                                onClick={ () =>{handleClick(); setOmed(!omed);}}
                            >
                                Página Principal
                            </NavLink>
                            :
                            <>
                                <Link
                                    activeClass="active"
                                    className="nav-item"
                                    to="Nosotros"
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
                                    to="/Contacto"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    onClick={handleClick}
                                >
                                    Contacto
                                </Link>
                            </>
                        }
                        <NavLink
                            activeClass="active"
                            className="nav-item nav-link text-white mt-0 pt-0 pb-0"
                            to="/registrer"
                            onClick={ () =>{handleClick(); handleMenu();}}
                        >
                            Registrarse
                        </NavLink>
                        <NavLink
                            activeClass="active"
                            className="nav-item nav-link text-white mt-0 pt-0"
                            to="/login"
                            onClick={ () =>{handleClick(); handleMenu();}}
                        >
                            Iniciar Sesión
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="nav-item" style={{position:"absolute", right:"10px"}}>
                <BurguerButton clicked={clicked} handleClick={handleClick}/>
            </div>
        </nav>
        <div>
            <div className={`burguermenu ${clicked ? 'active': ''}`}></div>
        </div>
      </>
    );
  };