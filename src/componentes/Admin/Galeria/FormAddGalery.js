import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registroDesdeLider } from '../../../actions/auth'
import { startSaveData, startUploadingImage } from '../../../actions/gallery'
import { useForm } from '../../../hooks/useForm'

export const FormAddGalery = () => {
	const dispatch = useDispatch()
	const [formValues, handleInputChange] = useForm({
		name: '',
		urlImg: ''
	})
	const { name, urlImg } = formValues

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const typeFile = file.name.split('.')[1]
			const fileName = name + '.' + typeFile
			const auxFile = new File([file], fileName)
			dispatch(startUploadingImage(auxFile));
		}
	}

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const file = e.target.files[0];


	// 	if (file) {
	// 		dispatch(startUploadingImage(file));
	// 		dispatch()
	// 	}

	// 	dispatch(registroDesdeLider(formValues));

	// }

	const handleSave = () => {
		dispatch(startSaveData());
	}

	return (
		<form>
			<div className="form-row">
				<div className="col-md-4 mb-3">
					<label >Nombre de imagen</label>
					<input type="text" className="form-control" placeholder="Imagen" onChange={handleInputChange} name="name" required />
				</div>
				<div className="col-md-4 mb-3">
					<label for="fileSelector">Seleccionar imagen:</label>
					<input
						id="fileSelector"
						type="file"
						name="file"
						accept="image/png, image/jpeg"
						onChange={handleFileChange}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="col-md-6 mb-3">
					<button
						className="btn btn-primary"
						onClick={handleSave}>
						Subir imagen
					</button>
				</div>
			</div>
		</form>
	)
}
