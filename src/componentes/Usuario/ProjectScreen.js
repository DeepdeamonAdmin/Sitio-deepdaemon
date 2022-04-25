import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
export const ProjectScreen = ({ status }) => {

	const { projectsAll } = useSelector(state => state.projects);
	const [showModal, setShowModal] = useState(false)

	if (showModal) {
		console.log("Hola");
		return (
			<div>
				{console.log("Hola")}
				{/* <ModalInfoProject key={project.id} item={project} /> */}
			</div>
		)
	} else {
		return (
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
					projectsAll.map(project => (
						//imprimir solamente si el estado es igual al seleccionado
						project.estado === status && (
							<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ width: 340, Maxheight: 150 }} >
								{console.log(project)}
								<img
									className="card-img"
									src={project.urlImg}
									//Centrar la imagen
									style={{
										objectFit: 'cover',
										objectPosition: 'center',
										height: "200px",
										width: '200px'
									}}
									alt="member"
								/>
								<div className="card-body text-primary">
									<h5 className="card-title"> {project.name} </h5>
									{/* <ModalInfoProject item={project} key={project.id} /> */}
									<ControlModal color={"primary"} idModal={project.id} onClick={() => setShowModal(true)} />
								</div>
							</div>
						)
					))
				}
			</div >
		)
	}
}
