import React, { useEffect } from 'react'
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import Form from 'react-bootstrap/Form';
import './users.css'
import fotoPerfil from '../../assets/Usuario.jpg';
import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../actions/user';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

export const Perfil = () => {

	const dispatch = useDispatch();

	const { datos: datoUser } = useSelector(state => state.user);
	const [formValues, handleInputChange] = useForm(datoUser);
	// console.log(datoUser)

	const { nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, ss } = formValues;

	const { active } = useSelector(state => state.user);
	const [isChecked, setIsChecked] = useState(ss);

	console.log(formValues)

	useEffect(() => {

		dispatch(activeData({ ...formValues }));

	}, [formValues, dispatch])

	//traer datos de escuelas y carreras
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

	//Guardar informacion editada
	const handleSave = () => {
			formValues.ss = isChecked;
			dispatch(startSaveData(formValues)); //tenia antes active
	}

	//carga de imagenes
	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startUploading(file));
		}
	}

	const handleOnChange = () => {
		setIsChecked(!isChecked);

	};

	return (
		<div className='container'>
			<div className="center-user">
				<table className='tb-user'>
					<tr>
						<td rowSpan={3}>
							<div onClick={handlePictureClick}>
								<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
							</div>
						</td>
						<td colSpan={2}>
							<input
								id="fileSelector"
								type="file"
								name="file"
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
							<p className='titulo'>Información Básica </p>
						</td>
					</tr>
					<tr>
						<td colspan={2}>
							<div className='container'>
								<input
									type='label'
									placeholder='Nombre:'
									className='form-control datos'
									name='nombre'
									required
									value={nombre}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={2}>
							<div className='container'>
								<input
									type='label'
									placeholder='Password:'
									className='form-control datos'
									name='password'
									required
									value={password}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						{/* <td>
							<div className='container'>
								<input
									type='date'
									className='form-control datos'
									name='fechaNac'
									required
									value={fechaNac}
									onChange={handleInputChange}
								/>
							</div>
						</td> */}
						<td>
							<div className='container'>
								<select
									className="form-control datos"
									name='nivel'
									value={nivel}
									onChange={handleInputChange}
								><option value="vacio"> No se ha seleccionado ninguna opcion </option>
									<option value='bachelor' > Bachelor </option>
									<option value='masters' > Masters </option>
									<option value='phd' > PHD </option>
									<option value='work' > Work </option>
								</select>
							</div>
						</td>
						<td>
							<div className='container'>
								<select
									className="form-control datos"
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
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className='container'>
								<select
									className="form-control datos"
									name='rol'
									value={rol}
									onChange={handleInputChange}
								>
									<option value='alumno' > Alumno </option>
									<option value='other' > other </option>
								</select>
							</div>
						</td>
						<td colSpan={2}>
							<div className='container'>
								{/* <label> S.S. </label>
								<input
									type='checkbox'
									name='ss'
									value='1'
									onChange={handleInputChange}
								/> */}
								<Form.Check
									type="checkbox"
									id="ss"
									label="ss"
									checked={isChecked}
									onChange={handleOnChange}
								/>

							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={3}>
							<div className='container'>
								<textarea
									className="form-control datos"
									rows='6'
									name='descripcion'
									placeholder='Descripcion'
									value={descripcion}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>

					<tr>
						<td colSpan={3}>
							<hr />
							<p className='titulo'>Formación</p>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<label> Escuela </label>
								<select
									className="form-control datos"
									name='idSchool'
									value={idSchool}
									onChange={handleInputChange}

								>
									<option key="vacio" value="vacio"> No se ha seleccionado ninguna opcion </option>
									{

										escuela.map(item => (
											<option key={item.id} value={item.id}> {item.name} </option>
										))


									}

								</select>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<label> Carrera </label>
								<select
									className="form-control datos"
									name='idCareer'
									value={idCareer}
									onChange={handleInputChange}
								>
									<option key="vacio" value="vacio"> No se ha seleccionado ninguna opcion </option>
									{

										carrera.map(item => (
											<option key={item.id} value={item.name}> {item.name} </option>
										))
									}

								</select>
							</div>
						</td>
					</tr>
					{/* <tr>
						<td colspan={3}>
							<div className='container'>
								<input
									type='label'
									placeholder='Titulo:'
									className='form-control datos'
									name='titulo'
									required
									value={titulo}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr> */}
					<tr>
						<td colSpan={3}>
							<hr />
							<p className='titulo'>Enlaces</p>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<input
									type='email'
									placeholder='Email:'
									className='form-control datos'
									name='email'
									required
									value={email}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<input
									type='url'
									placeholder='Linkedin:'
									className='form-control datos'
									name='linkedin'
									value={linkedin}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<input
									type='url'
									placeholder='Github:'
									className='form-control datos'
									name='github'
									value={github}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={3}>
							<div className='container'>
								<input
									type='url'
									placeholder='Facebook'
									className='form-control datos'
									name='facebook'
									value={facebook}
									onChange={handleInputChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={3} className='caja-btn'>
							<button
								className='btn btn-secondary'
								onClick={handleSave}
							>
								Guardar
							</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	)
}
