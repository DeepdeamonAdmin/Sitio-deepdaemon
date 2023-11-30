import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../../../firebase/firebase-config";
import Swal from "sweetalert2";
import { deleteUserExt } from '../../../actions/delete';
import { startLoadingUsers } from '../../../actions/user';


export const ExternoCard = (item) => {
	const dispatch = useDispatch();

	const handleDelete = (e) => {
		e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este usuario?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(item.id)
                dispatch(deleteUserExt(item));
                dispatch(startLoadingUsers());
            }
        })
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