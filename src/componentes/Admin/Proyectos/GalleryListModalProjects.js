import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase-config';

import { getDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import { refreshData, startLoadinUsersAll } from '../../../actions/user';


export default function GalleryListModalProjects({GlAMg}) {

	//console.log(id.id.id);
	//const idAlumno = id.id.id
	const dispatch = useDispatch();
	const { uid } = useSelector(state => state.auth)
	const navigate = useNavigate();
	//console.log(uid);
	const [gallery, setGallery] = useState([])

	const galleryCollection = collection(db, `Gallery/${uid}/Imagenes`);

	const getGallery = async () => {
		const datos = await getDocs(galleryCollection);
		setGallery(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
	}

    /*const handleClick = (e) => {
        e.preventDefault();

        //Copiar el link de la imagen
        const urlImg = e.target.src;

        //const memberRef = doc(db, 'Usuarios', idAlumno);

        const data = {
            urlImg,
        };
        console.log(data)
        //updateDoc(memberRef, data);
        //mostrar mensaje de confirmacion
        //Swal.fire('Usuario editado', 'Éxito');

        //cerrar modal
        //dispatch(startLoadinUsersAll()) revisar esto para la funcion de cargar los proyectos, puede servir
        dispatch(uiCloseModal())
        //navigate(`/admin/alumnos`);
    }*/

	useEffect(() => {
		getGallery()
	}, [])
	return (
		<>
			{
				gallery.map(imagen => (
					<div className="card p-2 border-primary mb-3" key={imagen.id} style={{ width: 12 + "rem" }}>
						<img
							className='card-img'
							src={imagen.photo}
							alt={'imagen'}
							style={{
								height: '200px',
								width: '200px'
							}}
							onClick={() => GlAMg(imagen.photo)}
						/>
						<span>{imagen.name}</span>
					</div>
				))
			}
		</>
	)
}
