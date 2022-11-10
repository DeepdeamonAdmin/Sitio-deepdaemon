import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { startNewProject } from '../../../../src/actions/projects';
import { useForm } from '../../../../src/hooks/useForm';
import { getAuth } from 'firebase/auth';
import { ModalGalleryAddProjects } from './ModalGalleryAddProjects';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
export const FormAddProject = () => {


	const dispatch = useDispatch();
	const auth = getAuth();
	const dN = auth.currentUser.displayName;

	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		correo: '',
		descripcion: '',
		results: '',
		nameTech: '',
		urlImg:'',
		estado: 'indevelop',
		display: 'Yes',
		url: '',
		publisher: dN
	});

	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher } = formValues;

	
	const navigate = useNavigate();
	const handleEnvProyect = () => {
		formValues.urlImg = datos;
		dispatch(startNewProject(formValues));
		reset();
		navigate('/admin/projects');
	}

	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
	}
	const handleFileChange = (e) => {
		console.log(e.target.value)
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Proyecto </h2>
				<hr />
			</div>

			<div className="row">
				<div className="col mb-3">
					<label> Name </label>
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
					<label> Contacto</label>
					<input
						className="form-control"
						type='text'
						name='correo'
						placeholder='Correo de contacto'
						value={correo}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className="col mb-3">
				<label>Description</label>
				<textarea
					className="form-control"
					rows='3' cols='40'
					name='descripcion'
					placeholder=' Desciption'
					value={descripcion}
					onChange={handleInputChange}
				/>
			</div>
			<div className="col mb-3">
				<label> Tech </label>
				<input
					className="form-control"
					type='text'
					name='nameTech'
					placeholder='Nombre Tecnología'
					value={nameTech}
					onChange={handleInputChange}
				/>
			</div>
			<div className="col mb-3">
				<label> Results </label>
				<textarea
					className="form-control"
					rows='6'
					name='results'
					placeholder='Resultados'
					value={results}
					onChange={handleInputChange}
				/>
			</div>
			<div className="row">
				<div className="col mb-6">
					<label> Imagen desde Galeria </label>
					<div className="card">
					<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddProjects MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
				</div>
				<div className="col mb-3">
					<label>Status </label>
					<select
						className="form-control"
						name='estado'
						value={estado}
						onChange={handleInputChange}
					>
						<option value='registered' > Registered </option>
						<option value='indevelop' > Indevelop </option>
						<option value='completed' > Completed </option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label>Mostrar en página principal</label>
					<select
						className="form-control"
						name='display'
						value={display}
						onChange={handleInputChange}
					>
						<option value='Si' > Si </option>
						<option value='No' > No </option>
					</select>
				</div>
				<div className="col mb-3">
					<label>URL</label>
					<input
						className="form-control"
						type='text'
						name='url'
						placeholder='URL de video'
						value={url}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<button
				className="btn2 btn-primary btn-large btn-block"
				onClick={handleEnvProyect}
			>
				Agregar
			</button>

		</div>
	)
}

