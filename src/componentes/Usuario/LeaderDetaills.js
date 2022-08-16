import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiCurrentModal, uiOpenModal } from '../../actions/ui';
import { ModalInfoProject } from './ModalInfoProject';

export const LeaderDetaills = ({ color, leader }) => {
	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null)
	const [showInf, setShowInfo] = useState(false)

	const handleClickNew = () => {
		// dispatch(uiOpenModal());
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
					<ul className="list-group list-group-flush">
						<li className={`list-group-item text-white bg-${color} `}>Descripción: {leader.short_desc}</li>
						<li className="list-group-item">Email: {leader.email}</li>
						<li className="list-group-item"><a href={leader.linkedin} class="card-link">LinkedIn</a></li>
					</ul>
				</div>
			}
		</>
	)
}
