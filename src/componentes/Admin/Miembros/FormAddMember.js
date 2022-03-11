import React from 'react';
import { useDispatch } from 'react-redux';
import { registerMember } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';
import { useGet } from '../../../hooks/useGet';
import { getCareer } from '../../../selectors/get/getCareer';
import { getSchool } from '../../../selectors/get/getSchool';

export const FormAddMember = () => {

	const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
		name: '',
		lastname: '',
		password: '',
		linkedin: '',
        email: '',
        shortDesc: '',
        longDesc:'',
        status: '', 
		photo: '',
		ss: 0,
		nivel: '',
		start: '',
		end:'',	
		idSchool:'',
		idCareer:''	  
	});

	const { name, lastname,	password, linkedin,	email, shortDesc, longDesc,  
			photo, start, end} = formValues;

    
    //envio a la api
    const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( registerMember(formValues) );
		console.log(formValues);
    }
	//Traemos la informacion de Career
	const { data:dataCareer } = useGet(getCareer);
	//Traemos la informacion de School
	const { data:dataSchool } = useGet(getSchool);

    return (
		<div className="container">
			<div className="app-title">
            	<h2>Agregar Colaborador </h2>
				<hr/>
			</div>
			<form onSubmit={ handleSubmit }>
				<div className="row">
					<div className= "col mb-3">
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
						<label> Lastname </label>
						<input
							className="form-control" 
							type='text'
							name='lastname'
							placeholder='Lastname'
							value = { lastname }
							onChange={ handleInputChange }
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
							value = { email }
							onChange={ handleInputChange }
						/>				
					</div>
					<div className="col mb-3">
						<label> Password </label>
						<input
							className="form-control"
							type='password'
							name='password'
							placeholder='Password'
							value = { password }
							onChange={ handleInputChange }
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
							value = { linkedin }
							onChange={ handleInputChange }
						/>
					</div>
					<div className="col custom-file">
						<label>Seleccione archivo </label>
						<input 
							className="custom-file-input"
							type='file'
							name='photo'
							value = { photo }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Short Description </label>
						<textarea
							className="form-control"
							rows='3' cols='40'
							name='shortDesc'
							placeholder='Short Desciption'
							value = { shortDesc }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				<div className="row">
					<div className="col mb-3">
						<label>Description </label>
						<textarea
							className="form-control"
							rows='10' cols='40'
							name='longDesc'
							placeholder='Desciption'
							value = { longDesc }
							onChange={ handleInputChange }
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 mb-3">
						<label> Status </label>
						<select
							className="form-control"
							name='status'
							onChange={ handleInputChange }
						>
							<option value = 'current' > current </option>
							<option value = 'graduate' > graduate </option>
							<option value = 'leader' > leader </option>
							<option value = 'out' > out </option>
						</select>
					</div>
					<div className="col-md-4 mb-2 ">
						<label>Nivel</label>
						<select
							className="form-control"
							name='nivel'
							onChange={ handleInputChange }
						>
							<option value = 'bachelor' > bachelor </option>
							<option value = 'masters' > masters </option>
							<option value = 'phd' > phd </option>
							<option value = 'work' > work </option>
						</select>
					</div>
					<div className="col-md-2 mb-5">
						<div className="input-group-prepend">
							<div className="input-group-text col-12">
							<label> S.S. </label>
								<input 
									type='checkbox'
									name='ss'
									value='1'
									onChange={ handleInputChange }
								/>	
							</div>
						</div>
					</div>	
				</div>
				<div className="row">
					<div className="col mb-2">
						<label> School </label>
						<select
							className="form-control"
							name='idSchool'
							onChange={ handleInputChange }
						>
							{
								dataSchool.map(item =>(
									<option key={item.id} value={item.id}> {item.name} </option>
								))
							}
						</select>
					</div>
					<div className="col mb-2">
						<label> Career </label>
						<select
							className="form-control"
							name='idCareer'
							onChange={ handleInputChange }
						>
							{
								dataCareer.map(item =>(
									<option key={item.id} value={item.id}> {item.name} </option>
								))
							}
						</select>
					</div>		
				</div>
				<div className="row">
					<div className="col-md-6 mb-5">
						<label> Comienzo </label>
							<input 
								className="form-control"
								type='date'
								min ='1900-01-01'
								name='start'
								value = { start }
								onChange={ handleInputChange }
							/>
					</div>
					<div className="col-md-6 mb-5">
						<label> Termino </label>
						<input 
							className="form-control"
							type='date'
							max ='2030-01-01'
							name='end'
							value = { end }
							onChange={ handleInputChange }
						/>
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
