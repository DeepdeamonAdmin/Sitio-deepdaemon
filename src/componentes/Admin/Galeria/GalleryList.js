import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../../firebase/firebase-config';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { startLoadingGallery } from '../../../actions/gallery';
import Swal from "sweetalert2";

export default function GalleryList({status}) {

	const { uid } = useSelector(state => state.auth)
	var gallery = useSelector(state => state.gallery);
	const dispatch = useDispatch();
	const galleryCollection = collection(db, `Gallery/${uid}/Imagenes`);
	const deleteImagen = async (imagen) => {
		const storage = getStorage();
		const information = "Gallery/"+imagen.type+"/"+imagen.name+"."+imagen.ext;
		const desertRef = ref(storage, information);
		deleteObject(desertRef).then(() => {
		}).catch((error) => {
		});
		const imagenDoc = doc(db, 'Gallery/'+imagen.type+'/Imagenes', imagen.id);
		await deleteDoc(imagenDoc);
		Swal.fire('Imagen eliminada', 'Éxito');
		dispatch(startLoadingGallery());
	}
	useEffect(() => {
	}, [])
	return (
		<>
			{
				gallery.gallery.map(category => category.id==status && category.gallery.map(imagen =>(
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
							onClick={() => {deleteImagen(imagen)}}>Borrar</button>
					</div>
				)))
			}
		</>
	)
}
