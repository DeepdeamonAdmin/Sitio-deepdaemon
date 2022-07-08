import React from 'react'
import { useDispatch } from 'react-redux'
import { startsNewImage, startUploadingImage } from '../../../actions/gallery'
import { useForm } from '../../../hooks/useForm'

export const FormAddGalery = () => {
	const dispatch = useDispatch()
	const [formValues, handleInputChange, reset] = useForm({
		name: ''
	})
	const { name } = formValues

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (name == '') {
				dispatch(startUploadingImage(file));
			} else {
				const typeFile = file.name.split('.')[1]
				const fileName = name + '.' + typeFile
				const auxFile = new File([file], fileName)
				dispatch(startUploadingImage(auxFile));
			}

		}
	}

	const handleSave = () => {
		dispatch(startsNewImage(formValues));
		reset();
	}

	return (
		<div>
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
		</div>
	)
}
