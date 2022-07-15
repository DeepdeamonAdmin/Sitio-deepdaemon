import React from 'react'
import SignCard from './SignCard'
import { useSelector } from 'react-redux'

import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

export default function AvisosList() {

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
	
	//Función para eliminar un aviso
	const deleteAviso = async (id) => {
		const avisoDoc = doc(db, 'Avisos', id);
		await deleteDoc(avisoDoc);
		getAvisos();
	}
	//Usar useEffect
	useEffect(() => {
		getAvisos();
	}, [])

	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn px-5">
				{
					avisos.map(aviso => (
						<SignCard
							key={aviso.id}
							{...aviso}
							
						/>
					))
				}
			</div>
		</>
	)
}
