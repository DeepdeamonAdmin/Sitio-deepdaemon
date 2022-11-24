import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import { startNewProject, startUploadingProject } from '../../actions/projects';
import { useForm } from '../../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { ModalGalleryAddTesis } from '../../../../src/componentes/users/ModalGalleryAddTesis';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { editTesis } from '../../../actions/edit';

export const EditInfoTesis= () => {

	/*
    const { projects } = useSelector( state => state.projects );
	const { idProject } = useParams();
    const dataProject = projects.filter(project=> project.id === idProject);*/
    const dispatch = useDispatch();
	const auth = getAuth();
	const dN = auth.currentUser.displayName;
	const {idTesis} = useParams();
	
	const { tesis } = useSelector(state => state.tesis);
	console.log(idTesis)
	const tesisO = tesis.filter(t => {
		return t.id === idTesis
	})

	const tesisObj = tesisO[0]

	console.log(tesisObj);

	const [formValues, handleInputChange] = useForm(tesisObj)
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher } = formValues;

	const handleSubmit = () => {
		if (datos != "") {
			formValues.urlImg = datos;
		}

		dispatch(editTesis(idTesis, formValues));
	}
	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
		formValues.urlImg = "";
		setDatos(datosMg);
	}
    return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Tesis </h2>
				<hr />
			</div>

			<div className="form-group row">
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

			<div className="form-group row">
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

			<div className="form-group row">
				<div className="col mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						rows='6' cols='40'
						name='descripcion'
						placeholder=' Desciption'
						value={descripcion}
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
			</div>

			<div className="row mb-12">
				<div className="col mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
					<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddTesis MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
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

			</div>

			<div class="text-center">
				<button
					className="btn btn-primary btn-large"
					onClick={handleSubmit}
				>
					Guardar
				</button>
			</div>

		</div>
	)
}
