import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMember } from '../../../actions/delete';

import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";
import Swal from "sweetalert2";

export const AlumnoCard = (item) => {
	const dispatch = useDispatch();

	const handleDelete = (e) => {
		e.preventDefault();
        const memberRef = doc(db, 'Usuarios', item.id);
        const data = {display: 'N'};
        updateDoc (memberRef, data);
        //mostrar mensaje de confirmacion
        Swal.fire('Usuario eliminado', 'Éxito');
	}


	return (
		<div className="card ms-3 mt-2" style={{ maxWidth: 540, height: 230 }}>
			<div className="row no-gutters">
				{/* <ModalEditarAlumno item={item.nombre} /> */}
				<div className="col-md-4 mt-2 ml-2 d-flex align-items-stretch" >
					<img src={item.urlImg} 
						className="imagealum d-inline-flex p-2" 
						alt="..."
						style={{
							marginLeft : '10%',
							with : '95%',
							height : '90%',
							borderRadius : "7%"
						}}  
					/>
				</div>
				<div className="col-sm-4 d-flex flex-column">
					<div className="card-body p-1">
						<h5 className="card-title ml-2 mt-2"> {item.nombre} </h5>
						<p className="card-text"> {item.email} </p>
						<Link to={`editar/${item.id}`} className="btn btn-primary btn-sm p-2">
							Editar
						</Link>
					</div>
				</div>
				{/*<div className="col-sm-3 d-flex flex-column ml-1">
					

						{/* <button className="btn btn-primary" onClick={() => dispatch(uiOpenModalEdit())}>
							Editar
						</button> */}

						
					

					{/* <p>
						<button
							type="button"
							className="btn btn-success btn-sm p-2"
							onClick={handleDelete}>Eliminar</button>
					
						<button
							type="button"
							className="btn btn-secondary btn-sm p-2"
						>Proyectos</button>
					</p> 
					</div>*/}

			</div>
		</div >
	)
}