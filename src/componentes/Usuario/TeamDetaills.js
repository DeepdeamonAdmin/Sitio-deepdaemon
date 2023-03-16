import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiCurrentModal, uiOpenModal } from '../../actions/ui';
import { ModalInfoProject } from './ModalInfoProject';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { uiCloseModal } from '../../actions/ui';
import "../../styles/DeepDaemon.css";

import Modal from 'react-modal';
import { TeamScreen } from './TeamScreen';


export const TeamDetaills = ({usuario }) => {
	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null)
	const [showInf, setShowInfo] = useState(false)
	const usuarioF = usuario.usuario;

	const handleClickNew = () => {
		// dispatch(uiOpenModal());
		console.log(usuarioF);
		setShowInfo(!showInf)
	}

	return (
		<>
			<Popup //aqui inicia el modal que abrira la informacion de los alumnos
            trigger={<button //Boton que activa el pop up
					className={"btn btn-primary"}
					onClick={handleClickNew}>
					{!showInf ? "Ver más.." : "Ver menos"}
			</button>}
            modal
            nested
        >
            {close => (
            <div className="modal modal-team">
                
                <div className="modalheader bg-primary"> {usuarioF.nombre} </div>
                <div className="modalcontent">
                {' '}				
                <div className='d-flex flex-col animate__animated animate__fadeIn'>
						<img
							className="img-fluid"
							src={usuarioF.urlImg}
							alt="member"
							style={{
								width:"200px",
								height: "300px",
								objectFit: "cover"
							}}
						/>	
						<ul class="list-group list-group-flush">
							<li className={`list-group-item`}><b>Sobre mi:</b><i>{usuarioF.descripcion}</i></li>
							<li className="list-group-item">{usuarioF.titulo ? `Titulo de Tesis: ${usuarioF.titulo}` : "Sin tesis"}</li>
							<li className="list-group-item">Email: {usuarioF.email}</li>
						</ul>
				</div>
                </div>
                    <div className="modalactions">
                        <button //boton para cerrar el modal en pop up 
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
			
		</>
	)
}
