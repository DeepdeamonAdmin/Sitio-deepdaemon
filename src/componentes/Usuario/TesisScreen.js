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
		<div className="container-fluid card-columns">
			{tesis.length === 0 && <p>No se encontraron tesis por el momento.</p>}
		  <div className="row">
			{tesis.map((t) => (
			  // Imprimir solamente si el estado es igual al seleccionado
			  t.display === "Yes" && (
				<div key={t.id} className="col-md-12 mb-3">
				  <div className="card" style={{ margin: 0 }}>
					<div className="row g-0">
					  <div className="col-md-3">
						<img
						  className="card-img"
						  src={t.urlImg}
						  style={{
							objectFit: 'cover',
							objectPosition: 'center',
							height: "90px",
							width: '90px'
						  }}
						  alt="member"
						/>
					  </div>
					  <div className="col-md-9">
						<div className="card-body text-primary d-flex flex-column h-100">
						  <h6 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							{t.name}
						  </h6>
						  <div className="text-right">
						  <ProjectDetaills color={"primary"} project={t} />
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