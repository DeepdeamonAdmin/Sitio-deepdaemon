import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ProjectDetaills } from './ProjectDetaills';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import { getAuth, } from 'firebase/auth';
import { VerMasProject } from '../ui/VerMasProject';
import { ModalCrearCuenta } from './ModalCrearCuenta';



export const ProjectScreen = ({ status1, status2 }) => {

	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null);
	const [showInf, setShowInfo] = useState(false);

	const [projects, setProjects] = React.useState([])
	React.useEffect(() => {
		const getProjects = async () => {
			try {
				const ref = collection(db, "Proyectos")
				const q = query(ref, where("estado", "in", [status1, status2]))
				console.log(q)
				const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setProjects(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		getProjects()
	}, [])

	return (
		<div className="container-fluid card-columns">
		  <div className="row">
		  {projects.length === 0 && <p className="team_title"> No se encontraron proyectos por el momento.</p>}
			{projects.map((project) => (
			  // Imprimir solamente si el estado es igual al seleccionado
			  project.display === "Yes" && (
				<div key={project.id} className="col-md-12 mb-3">
				  <div className="card" style={{ margin: 0 }}>
					<div className="row g-0">
					  <div className="col-md-3">
						<img
						  className="card-img"
						  src={project.urlImg}
						  style={{
							objectFit: 'cover',
							objectPosition: 'center',
							height: "100px",
							width: '100px'
						  }}
						  alt="member"
						/>
					  </div>
					  <div className="col-md-9">
						<div className="card-body text-primary d-flex flex-column h-100">
						  <h6 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							{project.name}
						  </h6>
						  <div className="flex-grow-1">
							<p className="card-text">{project.description}</p>
						  </div>
						  <div className="text-right">
							<ModalCrearCuenta />
							<VerMasProject project={project} />
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  )
			))}
		  </div>
		</div>
	  );	  
}
