import React from 'react';
import { useDispatch } from 'react-redux';
import { registroDesdeLider } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';

export const FormAddMember = () => {

	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		name: '',
		lastname: '',
		password: '',
		linkedin: '',
		email: '',
		shortDesc: '',
		longDesc: '',
		status: '',
		photo: '',
		ss: 0,
		nivel: '',
		start: '',
		end: '',
		idSchool: '',
		idCareer: ''
	});

	const { name, lastname, password, linkedin, email, shortDesc, longDesc,
		photo, start, end } = formValues;


	//envio a la api
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
				<h2>Agregar Colaborador </h2>
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
							placeholder='Nombre'
							value={name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Apellido </label>
						<input
							className="form-control"
							type='text'
							name='lastname'
							placeholder='Apellido'
							value={lastname}
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
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Contraseña </label>
						<input
							className="form-control"
							type='password'
							name='password'
							placeholder='Contraseña'
							value={password}
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
							value={linkedin}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col custom-file">
						<label>Seleccione archivo </label>
						<input
							className="custom-file-input"
							type='file'
							name='photo'
							value={photo}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Descripción breve </label>
						<textarea
							className="form-control"
							rows='3' cols='40'
							name='shortDesc'
							placeholder='Descripción breve'
							value={shortDesc}
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
							placeholder='Descripción'
							value={longDesc}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 mb-3">
						<label> Estado </label>
						<select
							className="form-control"
							name='status'
							onChange={handleInputChange}
						>
							<option value='current' > current </option>
							<option value='graduate' > graduate </option>
							<option value='leader' > leader </option>
							<option value='out' > out </option>
						</select>
					</div>
					<div className="col-md-4 mb-2 ">
						<label>Nivel</label>
						<select
							className="form-control"
							name='nivel'
							onChange={handleInputChange}
						>
							<option value='bachelor' selected > bachelor </option>
							<option value='masters' > masters </option>
							<option value='phd' > phd </option>
							<option value='work' > work </option>
						</select>
					</div>
					<div className="col-md-2 mb-5">
						<div className="input-group-prepend">
							<div className="input-group-text col-12">
								<label> S.S. </label>
								<input
									type='checkbox'
									name='ss'
									value='1'
									onChange={handleInputChange}
								/>
							</div>
						</div>
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
				<div className="row">
					<div className="col-md-6 mb-5">
						<label> Comienzo </label>
						<input
							className="form-control"
							type='date'
							min='1900-01-01'
							name='start'
							value={start}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-md-6 mb-5">
						<label> Termino </label>
						<input
							className="form-control"
							type='date'
							max='2030-01-01'
							name='end'
							value={end}
							onChange={handleInputChange}
						/>
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
