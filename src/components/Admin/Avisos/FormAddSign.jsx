//Uso de React
import React from 'react'
import { useState } from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux'

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm'

//Uso de Navigate para la navegación en el sitio
import { useNavigate } from 'react-router-dom';

//Componentes necesarios
import { startsNewSign } from '../../../actions/avisos'
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';

export const FormAddSign = () =>{
	
	//Declaración del dispatch
	const dispatch = useDispatch()

	//Declaración del navigate
	const navigate = useNavigate();

	//Contenido del formulario para un nuevo aviso
	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		urlImg: '',
		desc: ''
	})
	const { name, urlImg, desc } = formValues

	//Contenido de la imagen seleccionada
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
		formValues.urlImg=datosMg;
	}

	//Función de guardado
	const handleSave = () => {

		//Enviar al estado el nuevo aviso
		dispatch(startsNewSign(formValues));

		//Limpiar los formValues
		reset();

		//Retorno a la página de avisos
		navigate('/admin/avisos');
	}

	//Despliegue del formulario para añadir un nuevo aviso
	return (
		<div className="container">
			<div className='centro'>
    			<h2> Crear anuncio </h2>
			</div>
			<hr/>
			<div className="form-group row">
				<div className="col-md-6 mb-3">
					<label >Titulo</label>
					<input type="text" className="form-control" value={name} placeholder="Título" onChange={handleInputChange} name="name" required />
				</div>
			</div>
			<div className="form-row" >
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAdd MgAFAP={MgAFAP} />
						<FotosGalleryChoose />
					</div>
				</div>
				<div className="col-md-6 mb-3">
					<label >Descripción</label>
					<textarea className="form-control" rows="10" value={desc} onChange={handleInputChange} name="desc" required></textarea>
				</div>
			</div>
			<div class="text-center">
				<div className="col mb-3">
					<button
						className="btn btn-primary btn-large"
						onClick={handleSave}>
						Crear Aviso
					</button>
				</div>
			</div>
		</div>
	)
}
