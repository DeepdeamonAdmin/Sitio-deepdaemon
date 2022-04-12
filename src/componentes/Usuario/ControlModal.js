import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const ControlModal = ({ idModal }) => {
	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null)

	const handleClickNew = () => {
		dispatch(uiOpenModal());
		setCurrentModal(currentModal)
		console.log(idModal);
	}

	return (
		<button
			className="btn btn-primary "
			onClick={handleClickNew}>
			Ver más..
		</button>
	)
}
