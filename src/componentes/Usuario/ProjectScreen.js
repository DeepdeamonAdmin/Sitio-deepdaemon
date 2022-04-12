import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
export const ProjectScreen = ({ status }) => {

	const { data: project, loading } = useGet(getProjectStatus, status);
	// const [currentModal, setCurrentModal] = useState(null)

	return (
		<>
			{loading && <p className="animate__animated animate__flash">Loading</p>}
			<div className="card-columns animate__animated animate__fadeIn px-5">
				{
					// project.slice(0, 1)
					project.map(item => (
						<div className="card animate__animated animate__fadeIn" style={{ MaxWidth: 540, height: 250 }}>
							{/* <div className="row no-gutters"> col-md p-4 col-md*/}
							<img
								className="card-img-top"
								style={{ height: 100 }}
								src={`../../../../media/proyectos/project.png`}
								alt="member"
							/>
							<div>
								<div className="card-body ">
									<h5 className="card-title"> {item.name} </h5>
									<ModalInfoProject item={item} key={item.id} />
									{/* {modalOpen && <ModalInfoProject item={item} key={item.id} />} */}
									<ControlModal idModal={item.id} />
								</div>
							</div>
						</div>
					))
				}
			</div>
		</>
	)
}
