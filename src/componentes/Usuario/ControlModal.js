import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const ControlModal = ({ idModal, color }) => {
	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null)

	const handleClickNew = () => {
		dispatch(uiOpenModal());
		setCurrentModal(idModal)
	}

	return (
		<button
			className={`btn btn-${color}`}
			onClick={handleClickNew}>
			Ver más..
		</button>
	)
}
