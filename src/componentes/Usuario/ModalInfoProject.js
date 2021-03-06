import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactModal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';
import { customStyles } from '../../helpers/modalCustomStyles';


export const ModalInfoProject = ({ item, id }) => {

	const { modalOpen } = useSelector(state => state.ui);
	const { projects } = useSelector(state => state.projects);
	const dispatch = useDispatch();
	// const project = pro
	const closeModal = () => {
		dispatch(uiCloseModal());
	}

	return (
		<ReactModal
			id={item.id}
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div>
				<div className='card-body'>
					<img class="card-img-top" src={item.modal_media} alt="Modal Image" />
					<div className='d-flex justify-content-between'>
						<h5 className="card-title">{item.name} </h5>
						<button onClick={closeModal} className="btn btn-light">
							<span className='fas fa-times-circle'></span>
						</button>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item"> {item.descr}</li>
						<li class="list-group-item">{item.impact}</li>
						<li class="list-group-item"><a href={item.link} class="card-link">GitHub</a></li>
						{/* <li class="list-group-item"><a href={item.link} class="card-link">GitHub</a></li> */}
					</ul>
				</div>

			</div >
		</ReactModal	 >
	)
}

