import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiCurrentModal, uiOpenModal } from '../../actions/ui';
import { ModalInfoProject } from './ModalInfoProject';

export const TeamDetaills = ({ color, usuario }) => {
	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null)
	const [showInf, setShowInfo] = useState(false)

	const handleClickNew = () => {
		// dispatch(uiOpenModal());
		console.log(usuario);
		setShowInfo(!showInf)
	}

	return (
		<>
			<button
				className={`btn btn-${color}`}
				onClick={handleClickNew}>
				{!showInf ? "Ver más.." : "Ver menos"}
			</button>
			{showInf &&
				<div className='d-flex flex-col animate__animated animate__fadeIn'>
					<ul class="list-group list-group-flush">
						<li className={`list-group-item text-white bg-${color} `}>Descripción: {usuario.descripcion}</li>
						<li className="list-group-item">Fecha Nacimiento: {usuario.fechaNac}</li>
						<li className={`list-group-item text-white bg-${color} `}>Escuela: {usuario.school}</li>
						<li className="list-group-item">Unidad: {usuario.unidad}</li>
						<li className={`list-group-item text-white bg-${color} `}>Titulo: {usuario.titulo}</li>
						<li className="list-group-item">Grado: {usuario.grado}</li>
						<li className="list-group-item">Email: {usuario.email}</li>
						<li className="list-group-item">
							<a href={usuario.linkedin} class="card-link">LinkedIn</a>
							<a href={usuario.Github} class="card-link">GitHub</a>
						</li>
						<li className="list-group-item">
							<a href={usuario.facebook} class="card-link">Facebook</a>
						</li>
					</ul>
				</div>
			}
		</>
	)
}
