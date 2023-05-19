import React from 'react'
import Select from 'react-select'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { startNewTesisPosgrado } from '../../../actions/tesis';
import { useForm } from '../../../hooks/useForm';
import { getAuth } from 'firebase/auth';
import { ModalGalleryAddTesis } from '../../users/ModalGalleryAddTesis';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

export const FormAddTesisMaestria = () => {

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
		asesoresLista: '',
		alumnosLista: '',
		grado: 'Maestría'
	});
	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher, asesoresLista, alumnosLista, grado } = formValues;

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

	const techoptions = []
	techOption.map(item => (
		techoptions.push({ value: item.id, label: item.nombre })
	))
	const [tecnos, setTecnos] = useState({
		selectedOption: null
	})

	const handleChangeTecnos = selectedOption => {
		setTecnos({ selectedOption });
	}

	//Checkbox directores
	const options = []
	usuarios.filter(u => u.esAutor === 'Y').map((u) => (
		options.push({ value: u.id, label: u.nombre })
	))

	const [asesores, setAsesores] = useState({
		selectedOption: null
	})

	const handleChangeDirectores = selectedOption => {
		setAsesores({ selectedOption });
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
		const selectedAsesores = [];
		const selectedTecnos = [];
		if (asesores.selectedOption != null && alumnos.selectedOption != null) {
			if (asesores.selectedOption.length <= 2) {
				if (asesores.selectedOption != null) {
					asesores.selectedOption.map((u) => (
						selectedAsesores.push(u.label)
					))
				}
				if (tecnos.selectedOption != null) {
					tecnos.selectedOption.map((u) => (
						selectedTecnos.push(u.label)
					))
				}
				formValues.directoresLista = selectedAsesores;
				formValues.alumnosLista = alumnos.selectedOption.label;
				formValues.nameTech = selectedTecnos;
				formValues.urlImg = datos;
				dispatch(startNewTesisPosgrado(formValues));
				reset();
				navigate('/admin/Tesis');

			} else {
				Swal.fire('Error al agregar tesis, sólo se admiten máximo 2 Directores');
			}
		} else {
			Swal.fire('Error al agregar tesis,', 'Debe tener al menos un asesor y un alumno agregado', 'error');
		}

	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Tesis de Maestría</h2>
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
					<label>Tecnología utilizada</label>
					<Select
						isMulti
						name="nameTech"
						options={techoptions}
						className="basic-multi-select"
						classNamePrefix="select"
						value={tecnos.selectedOption}
						onChange={handleChangeTecnos}
					/>
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
					<label>Agregar asesores</label>
					<Select
						isMulti
						name="directores"
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						value={asesores.selectedOption}
						onChange={handleChangeDirectores}
					/>
				</div>
				<div className="col mb-3">
					<label>Agregar alumno</label>
					<Select
						name="alumno"
						options={options}
						className="basic-single"
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
