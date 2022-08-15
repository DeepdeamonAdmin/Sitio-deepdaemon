import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { registroDesdeLider } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';

export default function FormEditLider() {
	const dispatch = useDispatch();
	const { usuarios } = useSelector(state => state.user)
	const { idLider } = useParams()

	const lider = usuarios.filter(lider => {
		return lider.id === idLider
	})
	console.log(lider);
	const [formValues, handleInputChange] = useForm({
		Github: '',
		descripcion: '',
		email: '',
		facebook: '',
		fechaNac: '',
		linkedin: '',
		nombre: '',
		password: '',
		school: '',
		titulo: 0,
		unidad: '',
		urlImg: '',
	});

	const handleSubmit = (e) => {
		// console.log(formValues);
		e.preventDefault();
		dispatch(registroDesdeLider(formValues));
	}
	//Traemos la informacion de Career
	const { data: dataCareer } = useGet(getCareer);
	//Traemos la informacion de School
	const { data: dataSchool } = useGet(getSchool);

	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Lider </h2>
				<hr />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col mb-3">
						<label> Nombre </label>
						<input
							className="form-control"
							type='text'
							name='name'
							placeholder='Name'
							value={lider[0].nombre}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Email: </label>
						<input
							className="form-control"
							type='email'
							name='email'
							placeholder='Email'
							value={lider[0].email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Contraseña </label>
						<input
							className="form-control"
							type='password'
							name='password'
							placeholder='Password'
							value={lider[0].password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Linkedin </label>
						<input
							className="form-control"
							type='url'
							name='linkedin'
							placeholder='Likedin'
							value={lider[0].linkedin}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col custom-file">
						<label>Seleccione archivo </label>
						<input
							className="custom-file-input"
							type='file'
							name='photo'
							value={lider[0].photo}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Descripción </label>
						<textarea
							className="form-control"
							rows='10' cols='40'
							name='longDesc'
							placeholder='Desciption'
							value={lider[0].descripcion}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-2">
						<label> Escuela </label>
						<select
							className="form-control"
							name='idSchool'
							onChange={handleInputChange}
						>
							{
								dataSchool.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))
							}
						</select>
					</div>
					<div className="col mb-2">
						<label> Carrera </label>
						<select
							className="form-control"
							name='idCareer'
							onChange={handleInputChange}
						>
							{
								dataCareer.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))
							}
						</select>
					</div>
				</div>

				<button
					className="btn2 btn-primary btn-large btn-block mb-4"
					type="submit"
				>
					Agregar
				</button>
			</form>
		</div>
	)
}
