import React from 'react'
import { Link } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../../../firebase/firebase-config";
import Swal from "sweetalert2";

export const ExternoCard = (item) => {
	//const dispatch = useDispatch();

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
				{/* <ModalEditarAlumno item={item.nombre} /> */}
				<div className="col-md-4">
					<img src={item.urlImg} 
						className="card-img" 
						alt="..."  
						style={{
							height: "200px",
							width: '200px'
						}}
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

						{/* <button className="btn btn-primary" onClick={() => dispatch(uiOpenModalEdit())}>
							Editar
						</button> */}

						<Link to={`editar/${item.id}`} className="btn btn-primary">
							Editar
						</Link>
					</p>

					<p>
						<button
							type="button"
							className="btn btn-success btn-sm"
							onClick={handleDelete}>Eliminar</button>
					</p>
				</div>

			</div>
		</div >
	)
}