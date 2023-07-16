import React, {useState} from "react";
import { Link } from "react-scroll";
import { useDispatch,  useSelector} from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import styled from 'styled-components'

import logo from "../../styles/assets/img/sitio/deepdaemon.png";
import BurguerButton from "./BurgerButton";

export const NavBarMobile = () => {
    const [clicked,setClicked] = useState(false);
    const handleClick = () =>{
        setClicked(!clicked)
    }
    const dispatch = useDispatch();
    const history = useNavigate();
  
    const handleLogout = () => {
        dispatch(startLogout());
        history('/', {replace: true});
  
    }
    const { datos }  = useSelector( state => state.user );
    let nombre;
    if(datos)nombre = datos.nombre;
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
                    </div>
                </div>
                {/*<a href="/" className="links_items_mobile">Nosotros</a>
                <a href="/" className="links_items_mobile">Lideres</a>
                <a href="/" className="links_items_mobile">Proyectos</a>
                <a href="/" className="links_items_mobile">Equipo</a>
                <a href="/" className="links_items_mobile">Contacto</a>*/}
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
  const Bgdiv = styled.div`
  position: absolute;
  background-color: #212529;
  top:-1000px;
  left:-1000px;
  width: 100%;
  height: 100%
  z-index: -1;
  transition: all .6s ease;
  &.active{
    top:50px;
    left:0;
    border-radius: 0 0 100% 0;
    width: 100%;
    height: 100%
  }
  `