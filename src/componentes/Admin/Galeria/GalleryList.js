import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase-config';
import Swal from "sweetalert2";

export default function GalleryList() {

	const { uid } = useSelector(state => state.auth)
	// console.log(uid);
	const [gallery, setGallery] = useState([])
	const [function_gallery,setfunction_gallery] = useState('false')

	const galleryCollection = collection(db, `Gallery/${uid}/Imagenes`);

	const getGallery = async () => {
		const datos = await getDocs(galleryCollection);
		setGallery(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
		setfunction_gallery('true');
	}

	const deleteImagen = async (id) => {
		const imagenDoc = doc(db, `Gallery/${uid}/Imagenes`, id);
		await deleteDoc(imagenDoc);
		Swal.fire('Imagen eliminada', 'Éxito');
		getGallery();
	}

	useEffect(() => {
		getGallery()
	}, [function_gallery])
	return (
		<>
			{
				gallery.map(imagen => (
					<div className="card p-2 border-primary mb-3" key={imagen.id} style={{ width: 14 + "rem" }}>
						<img
							className='card-img'
							src={imagen.photo}
							alt={'imagen'}
							style={{
								height: '200px',
								width: '200px'
							}}
						/>
						<span>{imagen.name}</span>
						<br></br>
						<button
							type="button"
							className="btn btn-success btn-sm"
							onClick={() => {deleteImagen(imagen.id)}}>Borrar</button>
					</div>
				))
			}
		</>
	)
}
