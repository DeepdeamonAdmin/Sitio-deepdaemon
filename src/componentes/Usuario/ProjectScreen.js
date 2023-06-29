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
		<div className="cards-cols animate__animated animate__fadeIn">
			{projects.length === 0 && <p className="team_title">No se encontraron proyectos por el momento.</p>}
			{
				projects.map(project => (
					//imprimir solamente si el estado es igual al seleccionado
					(project.display === "Yes") && (
						<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ maxWidth: 450, MaxHeight: 150 }} >
							<img
								className="card-img"
								src={project.urlImg}
								//Centrar la imagen
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
									height: "110px",
									width: '110px'
								}}
								alt="member"
							/>
							<div className="card-body text-primary">
								<h5 className="card-title"> {project.name} </h5>
								<ModalCrearCuenta/>
								<VerMasProject project={project} />
							</div>

						</div>
					)
				))
			}
		</div >
	)
}
