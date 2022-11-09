import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { startNewProject, startUploadingProject } from '../../../../src/actions/projects';
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
		//reload();
		//dispatch(navigateToProjectsScreen())
	}

	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
	}
	const handleFileChange = (e) => {
		console.log(e.target.value)
		//const file = e.target.value;
		//console.log("file"+file)
		//urlImg = file;
	}

	// const navigate = useNavigate();

	// const navigateToProjectsScreen = () => {
	// 	navigate('.projects');
	// };

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

/*import React from 'react'
import { useDispatch } from 'react-redux';
import { registerProject } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getTech } from '../../../selectors/get/getTech';

export const FormAddProject = () => {


	const dispatch = useDispatch();
	const [ formValues, handleInputChange ] = useForm({
		name: '',
		desc: '',
		status: '',
		impact: '',
		frontImg:'',
		modalMedia:'',
		modalType:'',
		link:'',
		idTech: ''
	});

	const {name, desc, impact, frontImg, modalMedia, link } = formValues;

	
	// const [file, setFile] = useState(null);

	// const selectedHandler = e => {
	// 	setFile(e.target.files[0])
	// };
	
	// const sendHandler = () => {
	// 	if(!file){
	// 		alert('you must upload file')
	// 		return
	// 	}

	// 	const formdata = new FormData()
	// 	formdata.append('image', file)
	// 	document.getElementById('fileinput').value = null

	// 	setFile(null)
	// };
	

	//envio a la api
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch( registerProject(formValues) );
		console.log(formValues);
	}

	//Traemos la información de tech
	const { data } = useGet(getTech);

	return (
		<div className="container">
			<div className="app-title">
					<h2>Agregar Proyecto </h2>
				<hr/>
			</div>
			<form onSubmit={ handleSubmit }>
				<div className="row">
					<div className="col mb-3">
						<label> Name </label>
						<input
							className="form-control" 
							type='text'
							name='name'
							placeholder='Name'
							value = { name }
							onChange={ handleInputChange }
						/>
					</div>
					<div className="col mb-3">
						<label> Enlace </label>
						<input 
							className="form-control"
							type='url'
							name='link'
							placeholder='Enlace'
							value = { link }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				
				<div className="col mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='desc'
						placeholder=' Desciption'
						value = { desc }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="col mb-3">
					<label> Tech </label>
					<select
							className="form-control"
							name='idTech'
							onChange={ handleInputChange }
						>
							{
								data.map(item =>(
									<option key={item.id} value={item.id}> {item.descr} </option>
								))
							}
						</select>
				</div>
				<div className="col mb-3">
					<label> Impact </label>
					<textarea
						className="form-control"
						rows='6' 
						name='impact'
						placeholder='Impact'
						value = { impact }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Front Img</label>
							<input 
								className="form-control"
								type='file'
								name='frontImg'
								value = { frontImg }
								onChange={ handleInputChange }
							/>
					</div>

					<div className="col mb-3">
						<label>Modal Media </label>
							<input 
								className="form-control"
								type='file'
								name='modalMedia'
								value = { modalMedia }
								onChange={ handleInputChange }
							/>
					</div>
					<div className="col mb-3">
						<label>Tipe </label>
						<select
							className="form-control"
							name='modalType'
							onChange={ handleInputChange }
						>
							<option value = 'image' > image </option>
							<option value = 'video' > video </option>
							<option value = 'embed' > embed </option>
						</select>
					</div>

					<div className="col mb-3">
						<label>Status </label>
						<select
							className="form-control"
							name='status'
							onChange={ handleInputChange }
						>
							<option value = 'indevelop' > Indevelop </option>
							<option value = 'completed' > Completed </option>
						</select>
					</div>

				</div>                
				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"					
				>
					Agregar
				</button>
				
			</form>
		</div>
	)
}
*/