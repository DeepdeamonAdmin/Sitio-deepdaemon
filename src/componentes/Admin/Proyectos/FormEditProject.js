import React from 'react';
import { useState } from 'react';
import { db } from "../../../firebase/firebase-config";
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { editProject } from '../../../actions/edit';
import { ModalGalleryAddProjects } from './ModalGalleryAddProjects';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';

export const FormEditProject = ({ history }) => {

	const auth = getAuth();
	const dN = auth.currentUser.displayName;
	const { idProject, params } = useParams();

	//Traemos la información de firebase
	const dispatch = useDispatch();
	const { projects } = useSelector(state => state.projects);
	console.log(idProject)
	const pojectO = projects.filter(p => {
		return p.id === idProject
	})
	const project = pojectO[0]
	console.log(project);
	const [formValues, handleInputChange] = useForm(project)


	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher } = formValues;

	//envio a la api
	const handleSubmit = () => {
		//e.preventDefault();
		if (datos != "") {
			formValues.urlImg = datos;
		}

		dispatch(editProject(idProject, formValues));
	}
	//const flag = false;
	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
		formValues.urlImg = "";
		setDatos(datosMg);
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Proyecto </h2>
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
						<ModalGalleryAddProjects MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
					<img className='foto' src={formValues.urlImg || datos} alt="Imagen" />
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
				onClick={handleSubmit}
			>
				Guardar
			</button>
		</div>
	)
}

