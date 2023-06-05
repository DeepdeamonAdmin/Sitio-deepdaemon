import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';


import { uiCloseModal } from '../../actions/ui';
import { customStyles } from '../../helpers/modalCustomStyles';
import cic from "../../styles/assets/img/sitio/cic.png";
import logo from "../../styles/assets/img/sitio/deepdaemon.png";
import { NavLink } from 'react-router-dom';

// //configuracion Modal
Modal.setAppElement('#app');

export const ModalCrearCuenta = () => {

	const { modalOpen } = useSelector( state => state.ui );
    const dispatch = useDispatch();

	const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
    }

	return (
		<Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
			<h1>
                Crear Cuenta
            </h1>
            <hr />
            <h2>
                Crea tu cuenta gratis para continuar leyendo…
            </h2>

            

            <p className="text-center text-blue">
                Si creas tu cuenta tendrás acceso a todas las funcionalidades de nuestro sitio web.
            </p>

            <hr />
            <i className="fas fa-check-circle text-success"> </i> Consultar las publicaciones <hr />
            <i className="fas fa-check-circle text-success"> </i> Compartir publicaciones<hr />
            <i className="fas fa-check-circle text-success"> </i> Conocer a la comunidad<hr />
            <i className="fas fa-check-circle text-success"> </i> Ser parte de la comunidad<hr />

            <div className="d-flex justify-content-center">
                <img src={cic} className="ddcic" alt="cic" />
                <img src={logo} className="ddcic" alt="logo" />
            </div>

            <row className="d-flex justify-content-center">
                <NavLink to="/registrer">
                    <button className="btn btn-primary"> Crear Cuenta </button>
                </NavLink>
                <div className="col-1"></div>
                <NavLink to="/login">
                    <button className="btn btn-primary" onClick={closeModal}> Iniciar Sesión </button>
                </NavLink>
            </row>


		</Modal>



		
	)
}
