import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';
import { useState } from 'react';
import fotoPerfil from '../../../assets/Usuario.jpg'
import Swal from 'sweetalert2';
import { editUser, startEditingPicture } from '../../../actions/edit';
import { useEffect } from 'react';

export const FormEditarAlumno = (props) => {

	//Obtener el id del alumno
	const { idAlumno } = useParams();

	//Traer todos los alumnos
	const { usuarios } = useSelector(state => state.user);

	const dispatch = useDispatch();

	//Obtener el alumno seleccionado
	const alumno = usuarios.filter(alumno => {
		return alumno.id === idAlumno
	})

	useEffect(() => {
		setOldPassword(alumno[0].password)
	}, [usuarios]);

	const [password2, setPassword2] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	// console.log(alumno[0]); //dhernandez
	const [formValues, handleInputChange] = useForm({
		id: alumno[0].id,
		name: alumno[0].nombre,
		email: alumno[0].email,
		password: alumno[0].password,
		linkedin: alumno[0].linkedin,
		urlImg: alumno[0].urlImg,
		shortDesc: '',
		longDesc: '',
		star: '',
		end: '',
	});

	const {
		nombre,
		email,
		password,
		linkedin,
		urlImg,
		shortDesc,
		longDesc,
		status,
		nivel,
		ss,
		idSchool,
		idCareer,
		start,
		end,
	} = formValues;


	//envio a la api
	const handleSave = (e) => {
		e.preventDefault();
		if (password == password2) dispatch(editUser(formValues, oldPassword));
		else Swal.fire('Contraseñas no corresponden')
	}
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// dispatch(startEditingPicture(formValues, file));
		}
	}

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}

	//Traemos la informacion de Career
	const { data: dataCareer } = useGet(getCareer);
	//Traemos la informacion de School
	const { data: dataSchool } = useGet(getSchool);

	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Alumno </h2>
				<hr />
			</div>
			<div className="row">
				<div className='col'>
					<div onClick={handlePictureClick}>
						<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
					</div>
				</div>
				{/* <div className="col custom-file"> */}
				<input
					id='fileSelector'
					className="custom-file-input"
					type='file'
					name='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				{/* </div> */}
				<div className="col mb-3">
					<label> Nombre </label>
					<input
						className="form-control"
						type='text'
						name='nombre'
						placeholder='Nombre'
						value={nombre}
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
				<div className="col mb-3">
					<label> Confirmar contraseña </label>
					<input
						className="form-control"
						type='password'
						name='password2'
						required
						placeholder='Contraseña'
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
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
				<div className="col">
					<label>Descripción corta </label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='shortDesc'
						placeholder='Descripción corta'
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
					<label> Status </label>
					<select
						className="form-control"
						name='status'
						onChange={handleInputChange}
					>
						<option value='current' > current </option>
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
				className="btn2 btn-primary btn-large btn-block p-2 mb-2 w-25 mx-auto"
				onClick={handleSave}
			>
				Editar alumno
			</button>
		</div>
	)
}