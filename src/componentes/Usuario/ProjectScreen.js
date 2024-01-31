//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { VerMasProject } from '../ui/VerMasProject';
import { ModalCrearCuenta } from './ModalCrearCuenta';

export const ProjectScreen = ({ status1, status2 }) => {

	//Obtención de los proyectos del estado
	const projects  = useSelector(state => state.projects);

	//Filtrado de proyectos
	var projects_type = projects.projects.filter(projects => (projects.estado===status1||projects.estado===status2));

	//Despliegue de las tarjetas de los proyectos
	return (
		<>
		<div className="container card-columns" style={{display:"flex",flexWrap:"wrap",justifyContent:"left",marginLeft:"-20px"}}>
			{projects_type.length===0&&<p className="team_title"> No se encontraron proyectos por el momento.</p>}
			{
				projects_type.map(project=>(
					project.display==="Yes"&&(
						<div key={project.id} className="card-row">
							<div className="row mb-4 bg-light ml-2" style={{maxWidth:"500px",minWidth:"200px", height:"130px",borderRadius:"5px"}}>
								<div className="col-sm-6 mt-2 ml-2" style={{margin:"0px",padding:0,width:"110px"}}>
									<img
										className="card-img"
										src={project.urlImg}
										style={{
										objectFit: 'cover',
										objectPosition: 'center',
										height: "100px",
										width: '100px',
										borderRadius: '5px'
										}}
										alt="member"
									/>
								</div>
								<div className="col mt-2" style={{position:"relative"}}>
									<div className="card-body text-primary d-flex flex-column h-100">
										<h6 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
											{project.name}
										</h6>
										<div className="flex-grow-1">
											<p className="card-text">{project.description}</p>
										</div>
										<div className="text-right" style={{marginBottom:"10px"}}>
											<ModalCrearCuenta />
											<VerMasProject project={project} />
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				))
			}
		</div>
		</>
	);	  
}
