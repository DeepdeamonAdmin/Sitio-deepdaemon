//Uso de React
import React from 'react'
import { useEffect, useState } from 'react';

//Uso de Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

//Componentes necesarios
import SignCard from './SignCard'

export default function AvisosList() {

	//Configurar hooks
	const [avisos, setAvisos] = useState([]);

	//Referenciar db de firebase
	const avisosCollection = collection(db, 'Avisos');

	//Función para obtener todos los avisos
	const getAvisos = async () => {

		//Consulta asíncrona 
		const datos = await getDocs(avisosCollection);
		setAvisos(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
	}
	
	//Usar para obtener los avisos de la BD
	useEffect(() => {
		getAvisos();
	}, [])

	//Despliegue de la cantidad de avisos en BD
	return (
		<>
			<div className='row'>
				<div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap" style={{gap:"5px"}}>
					{
						avisos.map(aviso => (
							<SignCard
								key={aviso.id}
								{...aviso}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}
