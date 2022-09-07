import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';
import fotoPerfil from '../../../assets/Usuario.jpg'
import { editUser, startEditingPicture } from '../../../actions/edit';
import Swal from 'sweetalert2';
import { startLoadinUsersAll, startUploading } from '../../../actions/user';

import { collection, getDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";

import { ModalFoto } from './ModalFoto';
import { FotosGallery } from '../../ui/FotosGallery';

export const FormEditarAlumno = (props) => {

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { usuarios } = useSelector(state => state.user)
	const { idAlumno } = useParams()
	const alumnoO = usuarios.filter(alumno => {
		return alumno.id === idAlumno
	})
	const alumno = alumnoO[0]
	const [formValues, handleInputChange] = useForm(alumno);
	const [password2, setPassword2] = useState('')
	const [oldPassword, setOldPassword] = useState('')

	useEffect(() => {
		setOldPassword(alumno.password)
	}, [usuarios]);

	const {
		Github,
		descripcion,
		email,
		urlImg,
		linkedin,
		nombre,
		password,
		school,
		grado,
		titulo,
		unidad,
		display,
	} = formValues;

	const handleContra = (e) => {
		if (password == password2) dispatch(editUser(formValues, oldPassword));
		else Swal.fire('Contraseñas no corresponden')
	}


	const handleSave = (e) => {

		e.preventDefault();
		const memberRef = doc(db, 'Usuarios', alumno.id);
		const data = {
			Github,
			descripcion,
			email,
			urlImg,
			linkedin,
			nombre,
			password,
			school,
			grado,
			titulo,
			unidad,
			display,
		};
		updateDoc(memberRef, data);
		//mostrar mensaje de confirmacion
		Swal.fire('Usuario editado', 'Éxito');
		dispatch(startLoadinUsersAll())
		//ir a admin/alumnos para ver los cambios
		navigate(`/admin/alumnos`);


		//if (password == password2) 
		//	dispatch(editUser(formValues, oldPassword));
		//else Swal.fire('Contraseñas no corresponden')

		//dispatch(editUser(formValues, oldPassword));
	}
	//Traemos la informacion de Career
	const { data: dataCareer } = useGet(getCareer);
	//Traemos la informacion de School
	const { data: dataSchool } = useGet(getSchool);

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startEditingPicture(formValues, file));
		}
	}
	return (
		<div className="container">
			<div className="app-title">
				{alumno.rol === 'other' && (
					<h2>Editar Alumno </h2>
				)}
				{alumno.rol === 'administrador' && (
					<h2>Editar Líder </h2>
				)}
				<hr />
			</div>
			<div className="row">
				<div className='col mb-3'>
					<div className="card">
						<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
						<ModalFoto id={alumno.id} />
						<FotosGallery />
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

				<div className='col mb-3'>
					<div className="card">

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
						<button
							className="btn2 btn-primary btn-large btn-block p-2 mb-2 w-25 mx-auto"
							onClick={handleContra}
						>
							Cambiar
						</button>

					</div>
				</div>

			</div>

			<div className="row">
				{alumno.rol === 'other' && (
					<div className="col mb-3">
						<label> Estado actual </label>
						<select
							className="form-control"
							name='grado'
							value={grado}
							onChange={handleInputChange}
						>
							<option value='current'>En curso</option>
							<option value='graduate'>Graduado</option>
						</select>
					</div>
				)}
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
				<div className="col mb-3" style={{ display: 'none' }}>
					<label> Contraseña </label>
					<input
						className="form-control"
						type='text'
						name='password'
						placeholder='Contraseña'
						value={password}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3" style={{ display: 'none' }}>
					<label> Confirmar contraseña </label>
					<input
						className="form-control"
						type='password'
						name='password2'
						required
						placeholder='Contraseña'
						value={password}
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Mostrar en página principal </label>
					<select
						className="form-control"
						name='display'
						value={display}
						onChange={handleInputChange}
					>
						<option value='Y'>Si</option>
						<option value='N'>No</option>
					</select>

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
			</div>
			<div className="row">
				<div className="col mb-3">
					<label>Descripción </label>
					<textarea
						className="form-control"
						rows='10' cols='40'
						name='descripcion'
						placeholder='Descripción'
						value={descripcion}
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
				className="btn2 btn-primary btn-large btn-block p-2 mb-2 w-25 mx-auto"
				onClick={handleSave}
			>
				Guardar
			</button>
		</div>
	)
}