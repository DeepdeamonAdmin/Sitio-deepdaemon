import React from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import { startNewProject } from '../../../../src/actions/projects';
import { useForm } from '../../../../src/hooks/useForm';
import { getAuth } from 'firebase/auth';
import { ModalGalleryAddProjects } from './ModalGalleryAddProjects';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

export const FormAddProject = () => {


	const dispatch = useDispatch();
	const auth = getAuth();
	const dN = auth.currentUser.displayName;
	const navigate = useNavigate();

	//Traemos la información de los usuarios de firebase
	const { usuarios } = useSelector(state => state.user);

	//tech infor firebase
	const [techOption, setTech] = React.useState([])
	React.useEffect(() => {
		const obtenerTech = async () => {
			try {
				const Data = await getDocs(collection(db, "Tecnologias"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setTech(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerTech()
	}, [])

	//Formulario
	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		correo: '',
		descripcion: '',
		results: '',
		nameTech: '',
		urlImg: '',
		estado: 'indevelop',
		display: 'Yes',
		url: '',
		publisher: dN,
		autores: ''
	});
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, autores } = formValues;

	//Galeria
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
	}

	//Select autores
	const optionsAutores = []
	usuarios.filter(u => u.esAutor === 'Y').map((u) => (
		optionsAutores.push({ value: u.id, label: u.nombre})
	))

	const [state, setState] = useState({
		selectedOption: null
	})

	const handleChange = selectedOption => {
		setState({ selectedOption });
	}

	//envio a la api
	const handleEnvProyect = () => {
		const selectedAuthor = []
		if (state.selectedOption != null) {
			state.selectedOption.map((u) => (
				selectedAuthor.push( u.label)
			))
		}
		formValues.autores = selectedAuthor;
		formValues.urlImg = datos;
		dispatch(startNewProject(formValues));
		reset();
		navigate('/admin/projects');
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Proyecto </h2>
				<hr />
			</div>
			<div className="form-group row">
				<div className="col mb-3">
					<label> Nombre del proyecto</label>
					<input
						className="form-control"
						type='text'
						name='name'
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Contacto</label>
					<input
						className="form-control"
						type='text'
						name='correo'
						placeholder='Correo electrónico'
						value={correo}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="form-group row">
				<div className="col mb-2">
					<label> Tecnología utilizada</label>
					<select
						className="form-control"
						name='nameTech'
						value={nameTech}
						onChange={handleInputChange}
						
					>
						<option key="vacio" value="vacio"> No se ha seleccionado ninguna opcion </option>
						{
							techOption.map(item => (
								<option key={item.id} value={item.id}> {item.nombre} </option>
							))

						}
					</select>
					
				</div>
				<div className="col mb-3">
					<label>Status del proyecto</label>
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
					<label>Descripción</label>
					<textarea
						className="form-control"
						rows='6' cols='40'
						name='descripcion'
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
						options={optionsAutores}
						className="basic-multi-select"
						classNamePrefix="select"
						placeholder = "Seleccionar..."
						value={state.selectedOption}
						onChange={handleChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Liga del video</label>
					<input
						className="form-control"
						type='text'
						name='url'
						placeholder='URL'
						value={url}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className="row mb-12">
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddProjects MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
				</div>

				
				<div className="col mb-3">
					<label>Mostrar en página principal</label>
					<select
						className="form-control col-md-1 mb-3"
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
					onClick={handleEnvProyect}
				>
					Agregar
				</button>
			</div>


		</div>
	)
}

