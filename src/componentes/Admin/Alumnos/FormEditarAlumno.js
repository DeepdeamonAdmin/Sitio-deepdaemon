import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import fotoPerfil from '../../../assets/Usuario.jpg'
import { editUser, startEditingPicture } from '../../../actions/edit';
import Swal from 'sweetalert2';
import { startLoadingUsers } from '../../../actions/user';
import { collection, getDocs, deleteDoc, updateDoc, doc, query, where, querySnapshot } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGallery } from '../../ui/FotosGallery';

export const FormEditarAlumno = (props) => {

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { usuarios } = useSelector(state => state.user)
	const { idAlumno } = useParams()
	const alumnoO = usuarios.filter(alumno => {
		return alumno.id === idAlumno
	})
	const alumno = alumnoO[0]
	//console.log(alumno)
	const [formValues, handleInputChange] = useForm(alumno);
	const [password2, setPassword2] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
		formValues.urlImg=datosMg;
		//console.log(formValues.urlImg)
	}
	useEffect(() => {
		setOldPassword(alumno.password)
	}, [usuarios]);

	//proyectos donde el lider es autor
	const [listProject, setListProject] = React.useState([])
	React.useEffect(() => {
		const obtenerProject = async () => {
			try {
				const projectRef = collection(db, "Proyectos");
				const queryRef = query(projectRef, where("autores", "array-contains",
					alumno.nombre));;
				const q = await getDocs(queryRef);

				const arrayData = q.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setListProject(arrayData)
			} catch (error) {
				console.log(error)
			}
		}
		obtenerProject()
	}, [])


	const {
		nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, esAutor, display, idWork 
	} = formValues;
	const [isChecked, setIsChecked] = useState(formValues.ss);

	const handleContra = (e) => {
		if (password == password2) dispatch(editUser(formValues, oldPassword));
		else Swal.fire('Contraseñas no corresponden')
	}


	const handleSave = (e) => {
		//alumno.ss = isChecked;
		e.preventDefault();
		const memberRef = doc(db, 'Usuarios', alumno.id);
		const data = {
			nombre, email, urlImg, grado, descripcion, idSchool, idCareer, facebook, github, linkedin, nivel, password, rol, esAutor, display, idWork 
		};
		if(alumno.rol==="administrador"){data.idSchool="";data.idCareer="";data.github="";}
		if(alumno.rol==="alumno"||alumno.rol==="externo"){data.idWork="";}
		//data.ss = isChecked
		updateDoc(memberRef, data);
		//mostrar mensaje de confirmacion
		Swal.fire('Usuario editado', 'Éxito');
		dispatch(startLoadingUsers())
		//ir a admin/alumnos para ver los cambios
		navigate(`/admin/alumnos`);
	}

	const [escuela, listEscuela] = React.useState([])
	React.useEffect(() => {
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
	}, [])

	const [carrera, listCarrera] = React.useState([])
	React.useEffect(() => {
		const obtenerCarrera = async () => {
			try {
				const Data = await getDocs(collection(db, "Carrera"));
				const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				listCarrera(arrayData)

			} catch (error) {
				console.log(error)
			}
		}
		obtenerCarrera()
	}, [])

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startEditingPicture(formValues, file));
		}
	}


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
						<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
						<ModalGalleryAdd MgAFAP={MgAFAP} />
						<FotosGallery />
					</div>
				</div>
				<input
					id='fileSelector'
					className="custom-file-input"
					type='file'
					name='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				{/* </div> */}

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
						<option value="vacio"> No se ha seleccionado ninguna opcion </option>
						<option value='current' > Current </option>
						<option value='graduate' > Graduate </option>
						<option value='Leader' > Leader </option>
						<option value='out' > Out </option>
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
						{

							escuela.map(item => (
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
						{

							carrera.map(item => (
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
			{/* <div className="row"> */}
			{/* {alumno.rol === 'other' && ( */}

			{/* // )} */}
			{/* </div> */}
			{/* <div className="row"> */}
			{/* {alumno.rol === 'other' && ( */}

			{/* // )} */}
			{/* </div> */}
			{/* <div className="row">
				
			</div> */}
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
							<li>{item.name}</li>
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