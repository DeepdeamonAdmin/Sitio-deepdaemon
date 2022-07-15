import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMember } from '../../../actions/delete';
import { ModalEditarAlumno } from './ModalEditarAlumno';



export const AlumnoCard = (item) => {
	const dispatch = useDispatch();
	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(deleteMember(item.id));
	}

	return (
		<div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
			<div className="row no-gutters">
				<ModalEditarAlumno item={item.nombre} />
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
					<p>
						<button
							type="button"
							className="btn btn-secondary btn-sm"
						>Proyectos</button>
					</p>
				</div>

			</div>
		</div >
	)
}