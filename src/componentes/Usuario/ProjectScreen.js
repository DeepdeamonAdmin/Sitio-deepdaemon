import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
export const ProjectScreen = ({ status }) => {

	const { projectsAll } = useSelector( state => state.projects );

	return (
		<>
			<div className="card-columns animate__animated animate__fadeIn px-5">
				{
					// project.slice(0, 1)

					projectsAll.map(project => (
						//imprimir solamente si el estado es igual al seleccionado
						project.estado === status && (

						<div className="card animate__animated animate__fadeIn" style={{ MaxWidth: 540, height: 150}} >

							{/* <div className="row no-gutters"> col-md p-4 col-md*/}
							<img
								className="card-img-top cinco"
								src={ project.urlImg }
								//Centrar la imagen
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
									height: "100%",
									width: '100%'
								}}
								alt="member"
							/>

							<div>
								<div className="card-body ">
									<h5 className="card-title"> {project.name} </h5>
									<ModalInfoProject item={project} key={project.id} />
									{/* {modalOpen && <ModalInfoProject item={item} key={item.id} />} */}
									<ControlModal idModal={project.id} />
								</div>
							</div>
							<br></br>
						</div>
						
						)
					))
				}
			</div>
		</>
	)
}
