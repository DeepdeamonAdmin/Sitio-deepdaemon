//Uso de React
import React, { useEffect } from 'react'

//Uso de CSS
import './users.css'

//Uso de Firestore
import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from "firebase/firestore";

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso de hook useForm
import { useForm } from '../../hooks/useForm';

//Componentes necearios
import fotoPerfil from '../../assets/Usuario.jpg';
import { activeData, startSaveData } from '../../actions/user';


export const Perfil = () => {

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Obtención del usuario del estado
	const { datos: datoUser } = useSelector(state => state.user);

	//Contenido del formulario de edición del perfil
	const [formValues, handleInputChange] = useForm(datoUser);
	const { nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password } = formValues;

	//UseEffect para obtener la información activa
	useEffect(() => {
		dispatch(activeData({ ...formValues }));
	}, [formValues, dispatch])

	//Función y hook para obtener las carreras y las escuelas
	const [escuela, setEscuela] = React.useState([])
	const [carrera, setCarrera] = React.useState([])
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
		obtenerEscuela()
	}, [])	

	//Función para guardar la información actualizada
	const handleSave = () => {

		//Envio al estado de la información a actualizar
		dispatch(startSaveData(formValues));
	}

	//Despliegue del formulario de edición del perfil del alumno
	return (
		<div className='container'>
			<div className="center-user">
				<table className='tb-user'>
					<tr>
						<td rowSpan={3}>
							<div>
								<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
							</div>
						</td>
					</tr>
					<tr>
						<td colspan={2}>
							<div className='container'>
								<label> Nombre </label>
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
								<label> Contraseña </label>
								<input
									type='password'
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
						<td>
							<div className='container'>
								<label> Nivel </label>
								<select
									className="form-control datos"
									name='nivel'
									value={nivel}
									onChange={handleInputChange}
								><option value="vacio"> Nivel </option>
									<option value='bachelor' > Bachelor </option>
									<option value='masters' > Masters </option>
									<option value='phd' > PHD </option>
								</select>
							</div>
						</td>
						<td>
							<div className='container'>
								<label> Estado </label>
								<select
									className="form-control datos"
									name='grado'
									value={grado}
									onChange={handleInputChange}
								>
									<option value='current' > Current </option>
									<option value='graduate' > Graduate </option>
								</select>
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
									{escuela.map(item => (
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
									{carrera.map(item => (
											<option key={item.id} value={item.name}> {item.name} </option>
										))
									}
								</select>
							</div>
						</td>
					</tr>
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
