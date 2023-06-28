import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ProjectDetaills } from './ProjectDetaills';
import { ModalInfoProject } from './ModalInfoProject';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import { getAuth, } from 'firebase/auth';



export const TesisScreen = ({ status1, status2 }) => {

	const dispatch = useDispatch();
	const [currentModal, setCurrentModal] = useState(null);
	const [showInf, setShowInfo] = useState(false);

	const [tesis, setTesis] = React.useState([])
	React.useEffect(() => {
		const getTesis = async () => {
			try {
				const ref = collection(db, "Tesis")
				const q = query(ref, where("estado", "in", [status1, status2]))
				const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setTesis(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		getTesis()
	}, [])
	console.log(tesis)

	return (
		<div className="cards-cols animate__animated animate__fadeIn">
			{tesis.length === 0 && <p>No se encontraron tesis por el momento.</p>}
			{
				tesis.map(t => (
					//imprimir solamente si el estado es igual al seleccionado
					(t.display === "Yes") && (
						<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ MaxWidth: 350, MaxHeight: 150 }} >
							<img
								className="card-img"
								src={t.urlImg}
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
								<h5 className="card-title"> {t.name} </h5>
								<ProjectDetaills color={"primary"} project={t} />
							</div>
						</div>
					)
				))
			}
		</div >
	)
}