//Uso de React
import React, { useState } from 'react'

//Uso de Redux
import { useDispatch } from 'react-redux'

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm'

//Uso de Swal para las alertas de las ejecuciones
import Swal from "sweetalert2";

//Componentes necesarios
import { startsNewImage, startUploadingImage } from '../../../actions/gallery'

export const FormAddGalery = () => {

	//Declaración del dispatch
	const dispatch = useDispatch()

	//Contenido del formulario para una nueva imagen
	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		type: '',
		ext: ''
	})
	const { name } = formValues

	//Declaración para el almacenamiento del archivo cargado
	const [file,setFile]=useState('');

	//Delcaración para seleccionar el tipo de imagen
	const [selectValue, setSelectValue] = useState('')

	//Función para controlar el cambio del tipo de imagen
	const handleSelectChange = (event) => {
		const { target } = event;
		setSelectValue(target.value);
		handleInputChange(event);
	}

	//Función para cargar el archivo
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	}

	//Función par salvar la imagen en la galería
	const handleSave =  async () => {
		var name_without_spaces;
		if (file) {

			//Condición si no se le ha asignado un nombre
			if (name == '') {

				//Alerta de nombre
				Swal.fire('Debes colocar un nombre a la imagen');
			} else {
				const typeFile = file.name.split('.')[1]

				//Obtener la extensión de la imagen
				formValues.ext = typeFile;

				//Eliminar los espacio y sustituirlos por '_'
				name_without_spaces = formValues.name.replaceAll(/\s/g,"_")
				const fileName = name_without_spaces + '.' + typeFile

				//Construir el archivo con su nuevo nombre
				const auxFile = new File([file], fileName)

				//Enviar al estado la imagen (archivo)
				await dispatch(startUploadingImage(auxFile,formValues.type));

				//Actualización del nombre con el nuevo sin espacios
				formValues.name = name_without_spaces;

				//Enviar el contenido del formulario.
				dispatch(startsNewImage(formValues));

				//Limpiar el formulario
				reset();
			}
		}else{
			//Mensaje de error al cargar el archivo
			console.log("Error al cargar el archivo");
		}
	}

	//Despliegue del formulario para añadir una nueva imagen a la galería
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
