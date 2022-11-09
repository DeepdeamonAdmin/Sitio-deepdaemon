import React from 'react';
import { useState } from 'react';
import { db } from "../../../firebase/firebase-config";
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector} from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getTech } from '../../../selectors/get/getTech';
import { editProject } from '../../../actions/edit';
import { ModalGalleryAddProjects } from './ModalGalleryAddProjects';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { doc, collection, getDoc, documentId } from "firebase/firestore";
import { getProjectwithid, getProject } from '../../../actions/projects';
import { loadProject} from '../../../helpers/loadProject';
export const FormEditProject = ({ history }) => {

	const auth = getAuth();
	const dN = auth.currentUser.displayName;
	const { idProject, params } = useParams();
	console.log(idProject);

	//Traemos la información de firebase
	const dispatch = useDispatch();

	
	// const [proyecto, setProyecto] = React.useState()
	// React.useEffect(() => {
	// 	const obtenerProyecto = async () => {
	// 		try {
	// 			const docRef = doc(db, "Proyectos", idProject);
	// 			const Data = await getDoc(docRef);
	// 			//const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
	// 			setProyecto(Data.data())
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// 	obtenerProyecto()
	// }, [])
	// console.log(proyecto);
	
	const [formValues, handleInputChange] = useForm({
		name: '',
		correo: '',
		descripcion: '',
		results: '',
		nameTech: '',
		urlImg: '',
		estado: '',
		display: '',
		url: '',
		publisher: ''
	});

	const { name, correo, descripcion, results, nameTech, urlImg, estado, display, url, publisher } = formValues;
	//console.log(name);
	//envio a la api
	const handleSubmit = (e) => {
		formValues.urlImg = datos;
		e.preventDefault();
		dispatch(editProject(idProject, formValues));
		// history.goBack();
	}

	const [datos, setDatos] = useState('');

	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
	}

	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Proyecto </h2>
				<hr />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col mb-3">
						<label> Name </label>
						<input
							className="form-control"
							type='text'
							name='name'
							placeholder='Nombre'
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
							placeholder='Correo de contacto'
							value={correo}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="col mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='descripcion'
						placeholder=' Desciption'
						value={descripcion}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label> Tech </label>
					<input
						className="form-control"
						type='text'
						name='nameTech'
						placeholder='Nombre Tecnología'
						value={nameTech}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label> Results </label>
					<textarea
						className="form-control"
						rows='6'
						name='results'
						placeholder='Resultados'
						value={results}
						onChange={handleInputChange}
					/>
				</div>
				<div className="row">
					<div className="col mb-6">
						<label> Imagen desde Galeria </label>
						<div className="card">
							<ModalGalleryAddProjects MgAFAP={MgAFAP} />
							<FotosGalleryChoose />
						</div>
					</div>
					<div className="col mb-3">
						<label>Status </label>
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
				<div className="row">
					<div className="col mb-3">
						<label>Mostrar en página principal</label>
						<select
							className="form-control"
							name='display'
							value={display}
							onChange={handleInputChange}
						>
							<option value='Si' > Si </option>
							<option value='No' > No </option>
						</select>
					</div>
					<div className="col mb-3">
					<label>URL</label>
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
				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"
				>
					Guardar
				</button>
			</form>
		</div>
	)
}

/*
return (
		<div className="container">
			<div className="app-title">
					<h2>Editar Proyecto </h2>
				<hr/>
			</div>
			<form onSubmit={ handleSubmit }>
				<div className="row">
					<div className="col mb-3">
						<label> Name </label>
						
							<input
							className="form-control" 
							type='text'
							name='name'
							placeholder='Name'
							value = { name }
							onChange={ handleInputChange }
						/>
					</div>
					<div className="col mb-3">
						<label> Enlace </label>
						<input 
							className="form-control"
							type='url'
							name='link'
							placeholder='Enlace'
							value = { link }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				
				<div className="col mb-3">
					<label>Description</label>
					<textarea
						className="form-control"
						rows='3' cols='40'
						name='desc'
						placeholder=' Desciption'
						value = { desc }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="col mb-3">
					<label> Tech </label>
					<select
							className="form-control"
							name='idTech'
							onChange={ handleInputChange }
						>
							{
								dataTech.map(item =>(
									<option key={item.id} value={item.id}> {item.descr} </option>
								))
							}
						</select>
				</div>
				<div className="col mb-3">
					<label> Impact </label>
					<textarea
						className="form-control"
						rows='6' 
						name='impact'
						placeholder='Impact'
						value = { impact }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Front Img</label>
							<input 
								className="form-control"
								type='file'
								name='frontImg'
								value = { frontImg }
								onChange={ handleInputChange }
							/>
					</div>

					<div className="col mb-3">
						<label>Modal Media </label>
							<input 
								className="form-control"
								type='file'
								name='modalMedia'
								value = { modalMedia }
								onChange={ handleInputChange }
							/>
					</div>
					<div className="col mb-3">
						<label>Tipe </label>
						<select
							className="form-control"
							name='modalType'
							onChange={ handleInputChange }
						>
							<option value = 'image' > image </option>
							<option value = 'video' > video </option>
							<option value = 'embed' > embed </option>
						</select>
					</div>
				</div>                
				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"					
				>
					Guardar
				</button>
				
			</form>
		</div>
	)
*/