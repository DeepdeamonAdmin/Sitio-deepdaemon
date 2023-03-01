import React from 'react';
import validator from 'validator';
import { removeError, setError } from '../../../actions/ui';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { registroDesdeLider } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export const FormAddAlumno = () => {
	const dispatch = useDispatch();
	const [formValues, handleInputChange] = useForm({
		nombre: '',
		// lastname: '',
		password: '',
		linkedin: '',
		facebook: '',
		github: '',
		email: '',
		descripcion: '',
		// shortDesc: '',
		// longDesc: '',
		grado: 'vacio',
		urlImg: '',
		ss: false,
		nivel: 'vacio',
		// start: '',
		// end: '',
		idSchool: 'vacio',
		idCareer: 'vacio',
		esAutor: 'Y',
		display: 'Y',
		rol: 'alumno'
	});

	const { nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, ss, esAutor, display } = formValues;
//console.log(formValues)

	//envio a la api
	const handleSubmit = (e) => {
			formValues.ss = isChecked;
			e.preventDefault();
			dispatch(registroDesdeLider(formValues));
	}
	//info firebase escuela
	const [escuela, setEscuela] = React.useState([])
	React.useEffect(() => {
		const obtenerEscuela = async () => {
			try {
				const Data = await getDocs(collection(db, "Escuela"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setEscuela(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerEscuela()
	}, [])

	//info firebase carrera
	const [carrera, setCarrera] = React.useState([])
	React.useEffect(() => {
		const obtenerCarrera = async () => {
			try {
				const Data = await getDocs(collection(db, "Carrera"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setCarrera(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerCarrera()
	}, [])

	const [isChecked, setIsChecked] = useState(ss);
	const handleOnChange = () => {
		setIsChecked(!isChecked);

	}

	
	return (
		<div className="container">
			<div className="app-title">
				<h2>Agregar Alumno </h2>
				<hr />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col mb-3">
						<label> Nombre* </label>
						<input
							className="form-control"
							type='text'
							name='nombre'
							required
							placeholder='Name'
							value={nombre}
							onChange={handleInputChange}
						/>
					</div>
					{/* <div className="col mb-3">
						<label> Apellidos </label>
						<input
							className="form-control"
							type='text'
							name='lastname'
							placeholder='Lastname'
							value={lastname}
							onChange={handleInputChange}
						/>
					</div> */}
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Email* </label>
						<input
							className="form-control"
							type='email'
							name='email'
							required
							placeholder='Email'
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Contraseña* </label>
						<input
							className="form-control"
							type='password'
							name='password'
							required
							placeholder='Password'
							value={password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Linkedin </label>
						<input
							className="form-control"
							type='url'
							name='linkedin'
							placeholder='Linkedin'
							value={linkedin}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Github </label>
						<input
							className="form-control"
							type='url'
							name='github'
							placeholder='Github'
							value={github}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Facebook </label>
						<input
							className="form-control"
							type='url'
							name='facebook'
							placeholder='Facebook'
							value={facebook}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col custom-file">
						<label>Seleccione archivo </label>
						<input
							className="custom-file-input"
							type='file'
							name='photo'
							value={urlImg}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Descripción</label>
						<textarea
							className="form-control"
							rows='3' cols='40'
							name='descripcion'
							placeholder='Desciption'
							value={descripcion}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* <div className="row">
					<div className="col mb-3">
						<label>Descripción </label>
						<textarea
							className="form-control"
							rows='10' cols='40'
							name='longDesc'
							placeholder='Desciption'
							value={longDesc}
							onChange={handleInputChange}
						/>
					</div>
				</div> */}
				<div className="row">
					<div className="col-md-4 mb-3">
						<label> Grado </label>
						<select
							className="form-control"
							name='grado'
							value={grado}
							onChange={handleInputChange}
						>
							<option value="vacio"> No se ha seleccionado ninguna opcion </option>
							<option value='current' > Current </option>
							<option value='graduate' > Graduate </option>
							<option value='Leader' > Leader </option>
							<option value='out' > Out </option>
						</select>
					</div>
					<div className="col-md-4 mb-2 ">
						<label>Nivel</label>
						<select
							className="form-control"
							name='nivel'
							value={nivel}
							onChange={handleInputChange}
						>
							<option value="vacio"> No se ha seleccionado ninguna opcion </option>
							<option value='bachelor' selected > Bachelor </option>
							<option value='masters' > Masters </option>
							<option value='phd' > PHD </option>
							<option value='work' > Work </option>
						</select>
					</div>
					<div className="col-md-2 mb-5">
						<div className="input-group-prepend">
							{/* <div className="input-group-text col-12">
								<label> S.S. </label>
								<input
									type='checkbox'
									name='ss'
									value='1'
									onChange={handleInputChange}
								/>
							</div> */}
							<Form.Check
									type="checkbox"
									id="ss"
									label="ss"
									checked={isChecked}
									onChange={handleOnChange}
								/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col mb-2">
						<label> Escuela </label>
						<select
							className="form-control"
							name='idSchool'
							value={idSchool}
							onChange={handleInputChange}
						>
							<option key="vacio" value="vacio"> No se ha seleccionado ninguna opcion </option>
							{
								/*dataSchool.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))*/
								escuela.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))

							}
						</select>
					</div>
					<div className="col mb-2">
						<label> Carrera </label>
						<select
							className="form-control"
							name='idCareer'
							value={idCareer}
							onChange={handleInputChange}
						>
							<option key="vacio" value="vacio"> No se ha seleccionado ninguna opcion </option>
							{
								/*dataCareer.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))*/
								carrera.map(item => (
									<option key={item.id} value={item.name}> {item.name} </option>
								))
							}
						</select>
					</div>
				</div>
				{/* <div className="row">
					<div className="col-md-6 mb-5">
						<label> Comienzo </label>
						<input
							className="form-control"
							type='date'
							min='1900-01-01'
							name='start'
							value={start}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-md-6 mb-5">
						<label> Termino </label>
						<input
							className="form-control"
							type='date'
							max='2030-01-01'
							name='end'
							value={end}
							onChange={handleInputChange}
						/>
					</div>
				</div> */}
				<div className="row">
					<div className="col-md-6 mb-5">
						<label>Mostrar en página principal</label>
						<select
							className="form-control"
							name='display'
							value={display}
							onChange={handleInputChange}
						>
							<option value='Y' > Si </option>
							<option value='N' > No </option>
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 mb-5">
						<label>Considerar para ser autor</label>
						<select
							className="form-control"
							name='esAutor'
							value={esAutor}
							onChange={handleInputChange}
						>
							<option value='Y' > Si </option>
							<option value='N' > No </option>
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 mb-5">
						<label>Tipo de usuario</label>
						<select
							className="form-control"
							name='rol'
							value={rol}
							onChange={handleInputChange}
						>
							<option value='alumno' > Alumno </option>
						</select>
					</div>
				</div>

				<button
					className="btn2 btn-primary btn-large btn-block mb-4"
					type="submit"
				>
					Agregar
				</button>
			</form>
		</div>
	)

}
