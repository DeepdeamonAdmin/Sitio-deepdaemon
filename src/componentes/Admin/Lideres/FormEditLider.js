import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { registroDesdeLider } from '../../../actions/auth';
import { startUploading } from '../../../actions/user';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';
import fotoPerfil from '../../../assets/Usuario.jpg'

export default function FormEditLider() {

	const dispatch = useDispatch();
	const { usuarios } = useSelector(state => state.user)
	const { idLider } = useParams()
	const liderO = usuarios.filter(lider => {
		return lider.id === idLider
	})
	const lider = liderO[0]
	const [formValues, handleInputChange] = useForm(lider);

	const {
		Github,
		descripcion,
		email,
		urlImg,
		linkedin,
		nombre,
		password,
		school,
		titulo,
		unidad,
	} = formValues;


	const handleSubmit = (e) => {
		// console.log(formValues);
		e.preventDefault();
		dispatch(registroDesdeLider(formValues));
	}
	//Traemos la informacion de Career
	const { data: dataCareer } = useGet(getCareer);
	//Traemos la informacion de School
	const { data: dataSchool } = useGet(getSchool);
	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();

	}
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// dispatch(sstartUploading(file));
		}
	}
	return (
		<div className="container">
			<div className="app-title">
				<h2>Editar Lider </h2>
				<hr />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className='col mb-3'>
						<div onClick={handlePictureClick}>
							<img className='foto' src={urlImg || fotoPerfil} alt="Foto de Perfil" />
						</div>
					</div>
					{/* <div className="col custom-file"> */}
					<input
						id='fileSelector'
						className="custom-file-input"
						type='file'
						name='file'
						style={{ display: 'none' }}
						onChange={handleFileChange}
					/>
					{/* </div> */}

					<div className="col mb-3">
						<label> Nombre </label>
						<input
							className="form-control"
							type='text'
							name='nombre'
							placeholder='Nombre'
							value={nombre}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label> Email: </label>
						<input
							className="form-control"
							type='email'
							name='email'
							placeholder='Email'
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col mb-3">
						<label> Contraseña </label>
						<input
							className="form-control"
							type='password'
							name='password'
							placeholder='Contraseña'
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
							placeholder='Likedin'
							value={linkedin}
							onChange={handleInputChange}
						/>
					</div>

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
					<div className="col mb-2">
						<label> Escuela </label>
						<select
							className="form-control"
							name='idSchool'
							onChange={handleInputChange}
						>
							{
								dataSchool.map(item => (
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
							onChange={handleInputChange}
						>
							{
								dataCareer.map(item => (
									<option key={item.id} value={item.id}> {item.name} </option>
								))
							}
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
