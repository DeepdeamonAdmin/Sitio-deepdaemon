import React from 'react'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { startNewTesis } from '../../../src/actions/tesis';
import { useForm } from '../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { ModalGalleryAddTesis } from '../../../src/componentes/users/ModalGalleryAddTesis';
import { FotosGalleryChoose } from '../ui/FotosGalleryChoose';
export const FormAddTesis = () => {


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
		publisher: dN,
		autores: ''
	});

	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, autores } = formValues;

	
	const navigate = useNavigate();

	//Traemos la información de los usuarios de firebase
	const { usuarios } = useSelector(state => state.user);
	//Checkbox autores
	const options = []
	
	usuarios.filter(u => u.esAutor === 'Y').map((u) => (
		options.push({ value: u.id, label: u.nombre })
	))

	const [state, setState] = useState({
		selectedOption: null
	})

	const handleChange = selectedOption => {
		setState({ selectedOption });
	}

	const handleEnvTesis = () => {
		const selectedAuthor = [];
		if(state.selectedOption != null) {
			state.selectedOption.map(u => (
				selectedAuthor.push({idAutor: u.value, nombreAutor: u.label})
			))
		}
		formValues.autores = selectedAuthor;
		formValues.urlImg = datos;
		dispatch(startNewTesis(formValues));
		reset();
		navigate('/user/Tesis');
	}

	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
	 	setDatos(datosMg);
	}
	// const handleFileChange = (e) => {
	// 	console.log(e.target.value)
	// }

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Tesis </h2>
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
					<label> Resultados </label>
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

			<div className="form-group row">
				<div className="col mb-3">
					<label>Agregar autores</label>
					<Select
						isMulti
						name="usuarios"
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						value={state.selectedOption}
						onChange={handleChange}
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
					onClick={handleEnvTesis}
				>
					Agregar
				</button>
			</div>

		</div>
	)
}

