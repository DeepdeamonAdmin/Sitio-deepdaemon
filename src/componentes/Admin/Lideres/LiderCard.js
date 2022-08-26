import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMember } from '../../../actions/delete';

import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";
import Swal from "sweetalert2";

export const LiderCard = (item) => {
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
		<div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
			<div className="row no-gutters">
				<div className="col-md-4">
					<img
						src={item.urlImg}
						alt="member"
						className="card-img"
					/>
				</div>
				<div className="col-md-5">
					<div className="card-body">
						<h5 className="card-title"> {item.nombre} </h5>
						<p className="card-text"> {item.email} </p>
					</div>
				</div>
				<div className="col-md-1">
					<p>
						<Link
							to={`editar/${item.id}`}
							className="btn btn-primary btn-sm">
							Editar
						</Link>
					</p>

					<p>
						<button
							type="button"
							className="btn btn-success btn-sm"
							onClick={handleDelete}>Eliminar</button>
					</p>
					<p>
						<button
							type="button"
							className="btn btn-secondary btn-sm"
						>Proyectos</button>
					</p>
				</div>

			</div>
		</div>
	)
}
