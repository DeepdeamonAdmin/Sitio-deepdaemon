import React from 'react';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';


const SignCard = (item) => {

	const dispatch = useDispatch();

	//Configurar hooks
	const [avisos, setAvisos] = useState([]);
	//Referenciar db de firebase
	const avisosCollection = collection(db, 'Avisos');
	//Función para obtener todos los avisos
	const getAvisos = async () => {
		const datos = await getDocs(avisosCollection);
		//console.log(datos.docs)
		setAvisos(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
	}

	const deleteAviso = async (id) => {
		const avisoDoc = doc(db, 'Avisos', id);
		await deleteDoc(avisoDoc);
		getAvisos();
	}

	return (
		<div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
			<div className="row no-gutters">
				<div className="col-md-4">
					<img
						src={item.photo}
						className="card-img"
					/>
				</div>
				<div className="col-md-5">
					<div className="card-body">
						<h5 className="card-title"> {item.name} </h5>
						<p className="card-text"> {item.desc} </p>
					</div>
				</div> 
				<div className="col-md-1">

					<p>
						<button
							type="button"
							className="btn btn-success btn-sm"
							onClick={() => {deleteAviso(item.id)}}>Borrar</button>
					</p>
				</div>

			</div>
		</div>
	);
}

export default SignCard;
