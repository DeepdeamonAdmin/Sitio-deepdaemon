import React from 'react'
import Select from 'react-select'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { startNewTesisGrado } from '../../../actions/tesis';
import { useForm } from '../../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { ModalGalleryAddTesis } from '../../users/ModalGalleryAddTesis';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

export const FormAddTesisGrado = () => {

	const dispatch = useDispatch();
	const auth = getAuth();
	const dN = auth.currentUser.displayName;
	const navigate = useNavigate();

	//Traemos la información de los usuarios de firebase
	const { usuarios } = useSelector(state => state.user);

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
		directoresLista: '',
		alumnosLista: '',
		grado: 'Licenciatura'
	});
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, directoresLista, alumnosLista, grado } = formValues;

	//Galeria
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
	}

	//tech
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

	//Checkbox directores
	const options = []
	usuarios.filter(u => u.esAutor === 'Y').map((u) => (
		options.push({ value: u.id, label: u.nombre })
	))

	const [directores, setDirectores] = useState({
		selectedOption: null
	})

	const handleChangeDirectores = selectedOption => {
		setDirectores({ selectedOption });
	}
	//Checkbox alumnos
	const [alumnos, setAlumnos] = useState({
		selectedOption: null
	})

	const handleChangeAlumnos = selectedOption => {
		setAlumnos({ selectedOption });
	}

	//envio a la api
	const handleEnvTesis = () => {
		const selectedDirectores = [];
		const selectedAlumnos = [];
		
		if (directores.selectedOption != null && alumnos.selectedOption != null) {
			if (directores.selectedOption.length <= 2) {
				if (directores.selectedOption != null) {
					directores.selectedOption.map((u) => (
						selectedDirectores.push(u.label)
					))
				}
				if (alumnos.selectedOption.length <= 4) {
					if (alumnos.selectedOption != null) {
						alumnos.selectedOption.map((u) => (
							selectedAlumnos.push(u.label)
						))
					}
					console.log(selectedDirectores);
					console.log(selectedAlumnos);
					formValues.directoresLista = selectedDirectores;
					formValues.alumnosLista = selectedAlumnos;
					formValues.urlImg = datos;
					dispatch(startNewTesisGrado(formValues));
					reset();
					navigate('/admin/Tesis');
				} else {
					Swal.fire('Error al agregar tesis', 'Sólo se admiten máximo 4 alumnos', 'error');
				}
			} else {
				Swal.fire('Error al agregar tesis', 'Sólo se admiten máximo 2 Directores', 'error');
			}
		}else{
			Swal.fire('Error al agregar tesis,', 'Debe tener al menos un director y un alumno agregado', 'error');
		}

	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Tesis Licenciatura</h2>
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
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						value={directores.selectedOption}
						onChange={handleChangeDirectores}
					/>
				</div>
				<div className="col mb-3">
					<label>Agregar alumnos</label>
					<Select
						isMulti
						name="alumnos"
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						value={alumnos.selectedOption}
						onChange={handleChangeAlumnos}
					/>
				</div>
			</div>

			<div className="row mb-12">
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddTesis MgAFAP={MgAFAP} />
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
						placeholder='URL de video'
						value={url}
						onChange={handleInputChange}
					/>
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
