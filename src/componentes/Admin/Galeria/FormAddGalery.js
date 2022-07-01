import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../../../hooks/useForm'

export const FormAddGalery = () => {
	const dispatch = useDispatch()

	const [formValues, handleInputChange] = useForm({
		name: '',
	})

	const { name, } = formValues
	return (
		<form>
			<div className="form-row">
				<div className="col-md-4 mb-3">
					<label >Nombre de imagen</label>
					<input type="text" className="form-control" placeholder="Imagen" value={name} onChange={handleInputChange} />
				</div>
				<div className="col-md-4 mb-3">
					<label for="avatar">Seleccionar imagen:</label>
					<input type="file"
						id="avatar" name="avatar"
						accept="image/png, image/jpeg" />
				</div>
			</div>
			<div className="form-row">
				<div className="col-md-6 mb-3">
					<button
						className="btn btn-primary"
						onClick={console.log("Subir")}
					>
						Subir imagen
					</button>
				</div>
			</div>
		</form>
	)
}
