//Uso de React
import React, { useState, useEffect } from 'react'

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso de useParams y useNavigate para la navegación en el sitio
import { useParams, useNavigate } from 'react-router-dom';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de Swal para las laertas en las ejecuciones
import Swal from 'sweetalert2';

//Uso de Firestore
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from "../../../firebase/firebase-config";

//Componentes necesarios
import { editUser } from '../../../actions/edit';
import { startLoadingUsers } from '../../../actions/user';
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGallery } from '../../ui/FotosGallery';

export const FormEditarAlumno = () => {

	//Declaración de useNavigate
	const navigate = useNavigate();

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Obtención del usuario del estado
	const { usuarios } = useSelector(state => state.user)
	const { idAlumno } = useParams()
	const alumnoO = usuarios.filter(alumno => {
		return alumno.id === idAlumno
	})
	const alumno = alumnoO[0]

	//Contenido del formulario de edición
	const [formValues, handleInputChange, reset] = useForm(alumno);
	const {
		nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, esAutor, display, idWork 
	} = formValues;
	const [password2, setPassword2] = useState('')
	const [oldPassword, setOldPassword] = useState('')

	//Obtener los datos de la galería
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
		formValues.urlImg=datosMg;
	}

	//useEffect para obtener la contraseña
	useEffect(() => {
		setOldPassword(alumno.password)
	}, [usuarios]);

	//Alamacenar los proyectos donde el usuario es autor, las escuelas y carreras
	const [listProject, setListProject] = React.useState([])
	const [escuela, listEscuela] = React.useState([])
	const [carrera, listCarrera] = React.useState([]);
	React.useEffect(() => {
		const obtenerProject = async () => {
			try {
				const projectRef = collection(db, "Proyectos");
				const queryRef = query(projectRef, where("autores", "array-contains",
					alumno.nombre));
				const q = await getDocs(queryRef);
				const arrayData = q.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setListProject(arrayData)
			} catch (error) {
				console.log(error)
			}
		}
		const obtenerCarrera = async () => {
			try {
				const Data = await getDocs(collection(db, "Carrera"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				listCarrera(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		const obtenerEscuela = async () => {
			try {
				const Data = await getDocs(collection(db, "Escuela"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				listEscuela(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerEscuela()
		obtenerCarrera()
		obtenerProject()
	}, [])

	//Función para manejar el cambio de contraseña
	const handleContra = (e) => {
		if (password === password2) {

			//Envio al estado la edición de la contraseña
			dispatch(editUser(formValues, oldPassword));
		}
		else {
			Swal.fire('Contraseñas no corresponden');
		}
	}

	//Función para manejar el guardado del formulario
	const handleSave = (e) => {

		//Faltaría colocar este código en las actions para mayor limpieza
		e.preventDefault();
		const memberRef = doc(db, 'Usuarios', alumno.id);
		const data = {
			nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, esAutor, display, idWork 
		};
		if(alumno.rol==="administrador"){data.idSchool="";data.idCareer="";data.github="";}
		if(alumno.rol==="alumno"||alumno.rol==="externo"){data.idWork="student";}
		updateDoc(memberRef, data);
		Swal.fire('Usuario editado', 'Éxito');
		reset();

		//Envio al estaod de la carga de los usuarios
		dispatch(startLoadingUsers());
		if(alumno.rol === 'administrador'){
			navigate(`/admin/lideres`);
		}else if (alumno.rol === 'alumno'){
			navigate(`/admin/alumnos`);
		}else{
			navigate(`/admin/externos`);
		}
	}

	//Despliegue del formulario de edición
	return (
		<div className="container">
			<div className="app-title">
				{(alumno.rol === 'externo'||alumno.rol === 'alumno') && (
					<h2>Editar Alumno</h2>
				)}
				{alumno.rol === 'administrador' && (
					<h2>Editar Líder</h2>
				)}
				<hr />
			</div>
			<div className="row mb-12">
				<div className='col-md-3 mb-3'>
					<div className="card">
						<img className='foto' src={urlImg} alt="Foto de Perfil" />
						<ModalGalleryAdd MgAFAP={MgAFAP} />
						<FotosGallery />
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Nombre* </label>
					<input
						className="form-control"
						type='text'
						name='nombre'
						required
						placeholder='Nombre'
						value={nombre}
						onChange={handleInputChange}
					/>
				</div>
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
				<div className='col mb-3'>
					<div className="card">
						<div className="col mb-3">
							<label> Contraseña </label>
							<input
								className="form-control"
								type='password'
								name='password'
								required
								placeholder='Contraseña'
								value={password}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col mb-3">
							<label> Confirmar contraseña </label>
							<input
								className="form-control"
								type='password'
								name='password2'
								required
								placeholder='Contraseña'
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							/>
						</div>
						<button
							className="btn btn-primary"
							onClick={handleContra}
						>
							Cambiar
						</button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3" style={{ display: 'none' }}>
					<label> Contraseña* </label>
					<input
						className="form-control"
						type='text'
						name='password'
						placeholder='Contraseña'
						value={password}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3" style={{ display: 'none' }}>
					<label> Confirmar contraseña* </label>
					<input
						className="form-control"
						type='password'
						name='password2'
						required
						placeholder='Contraseña'
						value={password}
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-3">
					<label>Tipo de usuario</label>
					<select
						className="form-control"
						name='rol'
						value={rol}
						onChange={handleInputChange}
					>
						{alumno.rol === 'alumno' && (
							<option value='alumno' > Alumno </option>
						)}
						{alumno.rol === 'alumno' && (
							<option value='externo' > Externo </option>
						)}
						{alumno.rol === 'administrador' && (
							<option value='administrador' > Líder </option>
						)}
						{alumno.rol === 'externo' && (
								<option value='externo' > Externo </option>
						)}
						{alumno.rol === 'externo' && (
								<option value='alumno' > Alumno </option>
						)}

					</select>
				</div>
				<div className="col mb-3">
					<label> Grado </label>
					<select
						className="form-control"
						name='grado'
						value={grado}
						onChange={handleInputChange}
					>
						<option value='current' > Current </option>
						<option value='graduate' > Graduate </option>
					</select>
				</div>
				<div className="col mb-3">
					<label> Nivel </label>
					<select
						className="form-control"
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
			</div>
			<div className="row">
				<div className="col mb-3">
					<label> Escuela </label>
					<select
						className="form-control"
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
				<div className="col mb-3">
					<label> Carrera </label>
					<select
						className="form-control"
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
				<div className="col mb-3">
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
				<div className="col mb-3">
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
				{alumno.rol === 'administrador' && (	
					<div className="col mb-3">
							<label>Seleccionar atributo</label>
							<select
								className="form-control"
								name='idWork'
								value={idWork}
								onChange={handleInputChange}
							>
								<option value="leader" > Lider </option>
								<option value="colaborator" > Colaborador </option>
							</select>
					</div>
				)}
			</div>
			<div className="row">
				<div className="col mb-3">
					<label>Descripción </label>
					<textarea
						className="form-control"
						rows='10' cols='40'
						name='descripcion'
						placeholder='Descripción'
						value={descripcion}
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
						placeholder='Likedin'
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
			</div>
			<div className="row">
				<div className="col-md-6 mb-5">
					<label> Proyectos </label>
					<ul>
						{listProject.map(item => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div class="text-center">
				<button
					className="btn btn-primary btn-large"
					onClick={handleSave}
				>
					Guardar
				</button>
			</div>
		</div>
	)
}