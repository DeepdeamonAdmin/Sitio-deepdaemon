import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiCurrentModal, uiOpenModal } from '../../actions/ui';
import { ModalInfoProject } from './ModalInfoProject';

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
			
			<button
				className={"btn btn-primary"}
				onClick={handleClickNew}>
				{!showInf ? "Ver más.." : "Ver menos"}
			</button>
			{
				showInf && 
					<div className='d-flex flex-col animate__animated animate__fadeIn'>
						<ul class="list-group list-group-flush">
							<li className="list-group-item text-white bg-primary "><b>Sobre mi:</b><i>{usuarioF.descripcion}</i></li>
							<li className="list-group-item">{usuarioF.titulo ? `Titulo de Tesis: ${usuarioF.titulo}` : "Sin tesis"}</li>
							<li className="list-group-item">Email: {usuarioF.email}</li>
						</ul>
					</div>

			/*(showInf)&&
				(usuarioF.grado ==='leader'?
					<div className='d-flex flex-col animate__animated animate__fadeIn'>
					<ul class="list-group list-group-flush">
							<li className="list-group-item text-white bg-primary "><b>Sobre mi:</b><i>{usuarioF.descripcion}</i></li>
							<li className="list-group-item">Email: {usuarioF.email}</li>
						</ul>
					</div>
				:
					<div className='d-flex flex-col animate__animated animate__fadeIn'>
						<ul class="list-group list-group-flush">
							<li className="list-group-item text-white bg-primary "><b>Sobre mi:</b><i>{usuarioF.descripcion}</i></li>
							<li className="list-group-item">Titulo de Tesis: {usuarioF.titulo}</li>
							<li className="list-group-item">Email: {usuarioF.email}</li>
						</ul>
					</div>
				)
				
				
			*/}
		</>
	)
}
