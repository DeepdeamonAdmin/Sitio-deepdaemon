import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ProjectDetaills } from './ProjectDetaills';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import {getAuth,} from 'firebase/auth';



export const ProjectScreen = ({ status1, status2}) => {

	//const { projectsAll } = useSelector(state => state.projects);
	//console.log(projectsAll)
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
				const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
				setProjects(arrayData)
				
			} catch (error) {
				console.log(error)
			}
		}
		getProjects()
	}, [])
	console.log(projects)
	return (
		<div className="cards-cols animate__animated animate__fadeIn">
			{
				projects.map(project => (
					//imprimir solamente si el estado es igual al seleccionado
					(project.display === "Yes") && (
						<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ MaxWidth: 350, MaxHeight: 150 }} >
							<img
								className="card-img"
								src={project.urlImg}
								//Centrar la imagen
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
									height: "100px",
									width: '100px'
								}}
								alt="member"
							/>
							<div className="card-body text-primary">
								<h5 className="card-title"> {project.name} </h5>
								{/* {<ModalInfoProject item={project} key={project.id} id={project.id} />} */}
								<ProjectDetaills color={"primary"} project={project} />
							</div>
						</div>
					)
				))
			}
		</div >
	)
}
