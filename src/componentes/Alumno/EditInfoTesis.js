import React from 'react'
import Select from 'react-select'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { ModalGalleryAdd } from '../Admin/Galeria/ModalGalleryAdd';
import { FotosGalleryChoose } from '../ui/FotosGalleryChoose';
import { editTesisGrado, editTesisPosgrado } from '../../actions/edit';

import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

export const EditInfoTesis = () => {

	//Traemos la información de los usuarios de firebase
	const { usuarios } = useSelector(state => state.user);

	const dispatch = useDispatch();
	const { idTesis } = useParams();
	const { tesis } = useSelector(state => state.tesis);
	console.log(idTesis)
	const tesisO = tesis.filter(t => {
		return t.id === idTesis
	})
	const tesisObj = tesisO[0]
	console.log(tesisObj);

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

	const alumnosListaInitAux = [];
	var alumnoAux = "";
	if (tesisObj.grado == "Licenciatura") {
		for (let i = 0; i < tesisObj.alumnosLista.length; i++) {
			alumnosListaInitAux.push(tesisObj.alumnosLista[i]);
		}
	} else {
		alumnoAux = tesisObj.alumnosLista;
	}

	const [formValues, handleInputChange] = useForm(tesisObj)
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, directoresLista, alumnosLista, grado, alumnosListaInit } = formValues;

	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		formValues.urlImg = "";
		setDatos(datosMg);
	}

	const selectedDirectores = [];
	const selectedAlumnos = [];

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
	if (formValues.grado == "Licenciatura") {
		alumnosLista.map((u) => (
			selectedAlumnos.push({ value: u, label: u })
		))
	} else {
		selectedAlumnos.push({ value: alumnosLista, label: alumnosLista })
	}

	const [alumnos, setAlumnos] = useState({
		selectedOption: selectedAlumnos
	})

	const handleChangeAlumnos = selectedOption => {
		setAlumnos({ selectedOption });
	}

	//envio a la api
	const handleSubmit = () => {
		if (datos != "") {
			formValues.urlImg = datos;
		}
		const selectedDirectores = [];
		const selectedAlumnos = [];

		if (directores.selectedOption != null && alumnos.selectedOption != null) {
			if (directores.selectedOption.length <= 2) {
				if (directores.selectedOption != null) {
					directores.selectedOption.map((u) => (
						selectedDirectores.push(u.label)
					))
				}
				if (formValues.grado == "Licenciatura") {
					if (alumnos.selectedOption.length <= 4) {
						if (alumnos.selectedOption != null) {
							alumnos.selectedOption.map((u) => (
								selectedAlumnos.push(u.label)
							))
						}
						formValues.directoresLista = selectedDirectores;
						formValues.alumnosLista = selectedAlumnos;
						formValues.urlImg = datos;
						formValues.alumnosListaInit = alumnosListaInitAux;
						dispatch(editTesisGrado(idTesis, formValues));
					} else {
						Swal.fire('Error al agregar tesis, sólo se admiten máximo 4 alumnos');
					}
				} else {
					formValues.directoresLista = selectedDirectores;
					formValues.alumnosLista = alumnos.selectedOption.label;
					formValues.urlImg = datos;
					formValues.alumnosListaInit = alumnoAux;
					dispatch(editTesisPosgrado(idTesis, formValues));
				}

			} else {
				Swal.fire('Error al agregar tesis, sólo se admiten máximo 2 Directores');
			}
		} else {
			Swal.fire('Error al agregar tesis,', 'Debe tener al menos un director/asesor y un alumno agregado', 'error');
		}
	}


	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Tesis </h2>
				<hr />
			</div>
			<div className="col mb-3">
				<label> Grado: {formValues.grado} </label>
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
				{grado === "Licenciatura" ? (
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
				) : (
					<div className="col mb-3">
						<label>Agregar asesores</label>
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
				)}

				{grado === "Licenciatura" ? (
					<div className="col mb-3">
						<label>Agregar alumnos</label>
						<Select
							isMulti
							name="alumnos"
							options={optionsA}
							className="basic-multi-select"
							classNamePrefix="select"
							value={alumnos.selectedOption}
							onChange={handleChangeAlumnos}
						/>
					</div>
				) : (
					<div className="col mb-3">
						<label>Agregar alumno</label>
						<Select
							name="alumno"
							options={optionsA}
							className="basic-single"
							classNamePrefix="select"
							value={alumnos.selectedOption}
							onChange={handleChangeAlumnos}
						/>
					</div>
				)}
			</div>

			<div className="row mb-12">
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAdd MgAFAP={MgAFAP} />
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
