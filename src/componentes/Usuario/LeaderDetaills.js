import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { uiCloseModal } from '../../actions/ui';
import "../../styles/DeepDaemon.css";


// //configuracion Modal
Modal.setAppElement('#app');

export const LeaderDetaills = ({leader, color}) => {
    const { usuarios } = useSelector(state => state.user);

    const { modalOpen } = useSelector( state => state.ui );
    const dispatch = useDispatch();
    const [currentModal, setCurrentModal] = useState(null)
    const [showInf, setShowInfo] = useState(false)

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
    }

    const handleClickNew = () => {
        // dispatch(uiOpenModal());
        setShowInfo(!showInf)
    }

    //carga de imagenes
	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}
    
    return (
        <>
        <Popup
            trigger={<button
				className={`btn btn-primary`}
				onClick={handleClickNew}>
				{!showInf ? "Ver más.." : "Ver menos"}
			</button>}
            modal
            nested
        >
            {close => (
            <div className="modal modal-leader">
                
                <div className="modalheader bg-primary"> LIDER </div>
                <div className="modalcontent">
                {' '}	
                {/*
                    usuarios.map(usuario => (
                        (usuario.grado === "leader" && usuario.display === "Y") && (
                            <img
                                className="img-fluid"
                                src={usuario.urlImg}
                                alt="leader"			
                            />)
                        ))*/}			
                <div className='d-flex flex-col animate__animated animate__fadeIn'>
                <h5> {usuarios.leader} </h5>
					<ul className="list-group list-group-flush">
						<li className={`list-group-item`}><b>Sobre mi:</b><i> {leader.descripcion}</i></li>
						<li className="list-group-item">Email: {leader.email}</li>
					</ul>
				</div>
                </div>
                    <div className="modalactions">
                        <button
                            className={`btn btn-primary`}
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                        }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </Popup>
        {/*<Popup trigger={<button>Trigger</button>} position="top left">
            {close => (
            <div>
                Content here
                <a className="close" onClick={close}>
                &times;
                </a>
            </div>
            )}
        </Popup>
            <Popup trigger={<button className={`btn btn-${color}`}> Ver más</button>} >
                    <div className='d-flex flex-col animate__animated animate__fadeIn'>
                        <ul className="list-group list-group-flush">
                            <li className={`list-group-item text-white bg-primary `}><b>Sobre mi:</b><i> {leader.descripcion}</i></li>
                            <li className="list-group-item">Email: {leader.email}</li>
                        </ul>
                    </div>
            </Popup>
            <Modal 
                isOpen={ modalOpen }
                onRequestClose={ closeModal }
                style={ customStyles }
                closeTimeoutMS={ 200 }
                className="modal"
                overlayClassName="modal-fondo"
                >
                    <div className='d-flex flex-col animate__animated animate__fadeIn'>
                    <ul className="list-group list-group-flush">
                        <li className={`list-group-item text-white bg-primary `}><b>Sobre mi:</b><i> {leader.descripcion}</i></li>
                        <li className="list-group-item">Email: {leader.email}</li>
                    </ul>
                </div>
            </Modal>*/}
        </>
    )
}

