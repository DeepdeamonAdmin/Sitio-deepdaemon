import React from 'react'
import { useDispatch } from 'react-redux'
import { startsNewImage, startUploadingImage } from '../../../actions/avisos'
import { useForm } from '../../../hooks/useForm'
import { ModalGalleryAddAvisos } from './ModalGalleryAddAvisos';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormAddSign = () =>{
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		urlImg: '',
		desc: ''
	})
	const { name, urlImg, desc } = formValues

	//Galeria
	const [datos, setDatos] = useState('');
	const MgAFAP = (datosMg) => {
		setDatos(datosMg);
		formValues.urlImg=datosMg;
	}

	const handleSave = () => {
		//formValues.urlImg = datos;
		dispatch(startsNewImage(formValues));
		reset();
		navigate('/admin/avisos');
	}

	return (
		<div className="container">
			<div className='centro'>
    			<h2> Crear anuncio </h2>
			</div>
			<hr/>
			<div className="form-group row">
				<div className="col-md-6 mb-3">
					<label >Titulo</label>
					<input type="text" className="form-control" value={name} placeholder="Imagen" onChange={handleInputChange} name="name" required />
				</div>
			</div>
			<div className="form-row" >
				<div className="col-md-3 mb-3">
					<label> Imagen desde Galeria </label>
					<div className="card">
						<img className='foto' src={urlImg || datos} alt="Imagen" />
						<ModalGalleryAddAvisos MgAFAP={MgAFAP} />
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
						Subir imagen
					</button>
				</div>
			</div>
		</div>
	)
}
