import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startsNewImage, startUploadingImage } from '../../../actions/gallery'
import { useForm } from '../../../hooks/useForm'

export const FormAddGalery = () => {
	const dispatch = useDispatch()
	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		type: '',
		ext: ''
	})
	const { name } = formValues
	const [file,setFile]=useState('');
	const [selectValue, setSelectValue] = useState('')
	const handleSelectChange = (event) => {
		const { target } = event;
		setSelectValue(target.value);
		handleInputChange(event);
	}
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	}
	const handleSave =  async () => {
		var name_without_spaces;
		if (file) {
			if (name == '') {
				const typeFile = file.name.split('.')[1]
				formValues.ext = typeFile;
				await dispatch(startUploadingImage(file,formValues.type));
			} else {
				const typeFile = file.name.split('.')[1]
				formValues.ext = typeFile;
				name_without_spaces = formValues.name.replaceAll(/\s/g,"_")
				const fileName = name_without_spaces + '.' + typeFile
				const auxFile = new File([file], fileName)
				await dispatch(startUploadingImage(auxFile,formValues.type));
			}

		}else{
			console.log("Error al cargar el archivo");
		}
		formValues.name = name_without_spaces;
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
			<div className='form-row'>
				<div className='col-md-6 mb-3'>
				<label> Type </label>
					<select
						value={selectValue}
						className="form-control"
						name='type'
						onChange={handleSelectChange}
					>
						<option value=''>Selecciona una opción</option>
						<option value='Aviso'>Aviso</option>
						<option value='Alumno'>Alumno</option>
						<option value='Externo'>Externo</option>
						<option value='Lider'>Líder</option>
						<option value='Proyecto'>Proyecto</option>
						<option value='Publicacion'>Publicación</option>
						<option value='Tesis'>Tesis</option>
					</select>
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
