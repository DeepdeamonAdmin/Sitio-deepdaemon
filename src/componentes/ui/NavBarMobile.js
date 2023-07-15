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
                {/*<div className="navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link
                            activeClass={clicked ? 'active' : ''}
                            className="nav-item nav-link"
                            to="Nosotros"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Nosotros
                        </Link>
                    </div>
                </div>*/}
            </div>
            
            <div className={`links_mobile ${clicked ? 'active' : ''}`}>
                <a href="/" className="links_items_mobile">Nosotros</a>
                <a href="/" className="links_items_mobile">Lideres</a>
                <a href="/" className="links_items_mobile">Proyectos</a>
                <a href="/" className="links_items_mobile">Equipo</a>
                <a href="/" className="links_items_mobile">Contacto</a>
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