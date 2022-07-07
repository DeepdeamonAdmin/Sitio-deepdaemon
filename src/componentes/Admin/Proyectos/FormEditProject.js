import React from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getTech } from '../../../selectors/get/getTech';
import { editProject } from '../../../actions/edit';

export const FormEditProject = ({ history }) => {
    
    const { idProject, params} = useParams();
    //console.log(typeof(params));
    
	//Traemos la información de tech
	const { data:dataTech } = useGet(getTech);
   
    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm({
		id:idProject,
        name: '',
        desc: '',
        impact: '',
        frontImg: '',
        modalMedia: '',
        modalType: '',
        link:'',
		idTech: ''
	});

    const {name, desc, impact, frontImg, modalMedia, link } = formValues;

    //envio a la api
    const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( editProject(formValues) );
		console.log(formValues);
        history.goBack();
    }


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
}
