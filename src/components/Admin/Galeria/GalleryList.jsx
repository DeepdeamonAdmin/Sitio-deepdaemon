//Uso de React
import React, { useEffect } from 'react'

//Uso de Firestore
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { getStorage, ref, deleteObject } from "firebase/storage";

//Uso de Redux
import { useSelector, useDispatch } from 'react-redux';

//Uso de Swal para las alertas de las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { startLoadingGallery } from '../../../actions/gallery';

export default function GalleryList({status}) {

	//Obtención de la galería dle estado
	var gallery = useSelector(state => state.gallery);

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Función para eliminar una imagen 
	const deleteImagen = async (imagen) => {

		//Obtenemos el almacenamiento 
		const storage = getStorage();

		//Construir la dirección de la imagen a eliminar
		const information = "Gallery/"+imagen.type+"/"+imagen.name+"."+imagen.ext;

		//Obtener su referencia
		const desertRef = ref(storage, information);

		//Eliminar la imagen (Archivo) (Falta configurar detalles de error o éxito)
		deleteObject(desertRef).then(() => {
		}).catch((error) => {
		});

		//Eliminar la imagen (Documento)
		const imagenDoc = doc(db, 'Gallery/'+imagen.type+'/Imagenes', imagen.id);
		await deleteDoc(imagenDoc);

		//Alerta de eliminación
		Swal.fire('Imagen eliminada', 'Éxito');

		//Solicitar al estado cargar nuevamente la galería
		dispatch(startLoadingGallery());
	}

	//useEffect para cargar la galería antes de renderizar el componente
	useEffect(() => {
	}, [])

	//Despliegue de las tarjetas de cada imagen
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
