import React from 'react';
import Select from 'react-select'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { editProject } from '../../../actions/edit';
import { ModalGalleryAddProjects } from './ModalGalleryAddProjects';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

export const FormEditProject = ({ history }) => {

	//const dN = auth.currentUser.displayName;
	//const auth = getAuth();

	//Traemos la información de los usuarios de firebase
	const { usuarios } = useSelector(state => state.user);

	//Traemos la información del proyecto de firebase
	const { idProject } = useParams();
	const dispatch = useDispatch();
	const { projects } = useSelector(state => state.projects);
	const pojectO = projects.filter(p => {
		return p.id === idProject
	})
	const project = pojectO[0]

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

	//se muestra la informacion en el formulario
	const [formValues, handleInputChange] = useForm(project)
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, directoresLista, colaboradoresLista } = formValues;

	//Galeria
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		formValues.urlImg = "";
		setDatos(datosMg);
	}

	const selectedDirectores = [];
	const selectedColaboradores = [];

	//Checkbox directores
	directoresLista.map((u) => (
		selectedDirectores.push({ value: u, label: u })
	))

	const optionsD = []
	usuarios.filter(u => (u.esAutor === 'Y' && u.rol === 'administrador')).map((u) => (
		optionsD.push({ value: u.id, label: u.nombre })
	))

	const optionsA = []
	usuarios.filter(u => (u.esAutor === 'Y' && u.rol !== 'administrador')).map((u) => (
		optionsA.push({ value: u.id, label: u.nombre })
	))

	const [directores, setDirectores] = useState({
		selectedOption: selectedDirectores
	})

	const handleChangeDirectores = selectedOption => {
		setDirectores({ selectedOption });
	}
	//Checkbox alumnos
	colaboradoresLista.map((u) => (
		selectedColaboradores.push({ value: u, label: u })
	))

	const [colaboradores, setColaboradores] = useState({
		selectedOption: selectedColaboradores
	})

	const handleChangeColaboradores = selectedOption => {
		setColaboradores({ selectedOption });
	}
	//envio a la api
	const handleSubmit = () => {
		//e.preventDefault();
		if (datos !== "") {
			formValues.urlImg = datos;
		}
		const selectedDirectores = [];
		const selectedColaboradores = [];
		if (directores.selectedOption != null) {
			directores.selectedOption.map((u) => (
				selectedDirectores.push(u.label)
			))
		}
		if (colaboradores.selectedOption != null) {
			colaboradores.selectedOption.map((u) => (
				selectedColaboradores.push(u.label)
			))
		}

		formValues.directoresLista = selectedDirectores;
		formValues.colaboradoresLista = selectedColaboradores;
		formValues.urlImg = datos;
		dispatch(editProject(idProject, formValues));
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Proyecto </h2>
				<hr />
			</div>
			<div className="form-group row">
				<div className="col mb-3">
					<label> Nombre del proyecto </label>
					<input
						className="form-control"
						type='text'
						name='name'
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
						placeholder='Correo electrónico'
						value={correo}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="form-group row">

				<div className="col mb-2">
					<label> Tecnología utilizada </label>
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
					<label>Status del proyecto </label>
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
					<label>Agregar Directores</label>
					<Select
						isMulti
						name="directores"
						options={optionsD}
						className="basic-multi-select"
						classNamePrefix="select"
						value={directores.selectedOption}
						onChange={handleChangeDirectores}
					/>
				</div>
				<div className="col mb-3">
					<label>Agregar colaboradores</label>
					<Select
						isMulti
						name="colaboradores"
						options={optionsA}
						className="basic-multi-select"
						classNamePrefix="select"
						value={colaboradores.selectedOption}
						onChange={handleChangeColaboradores}
					/>
				</div>
			</div>
			<div className="row mb-12">
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={formValues.urlImg || datos} alt="Imagen" />
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
						<option value='Yes' > Si </option>
						<option value='No' > No </option>
					</select>
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

