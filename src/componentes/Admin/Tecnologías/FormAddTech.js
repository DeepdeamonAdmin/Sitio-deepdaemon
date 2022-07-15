import React from 'react'
import { useDispatch } from 'react-redux'
import { registerTech } from '../../../actions/register';
import { startsNewTech } from '../../../actions/tecnologias';
import { useForm } from '../../../hooks/useForm';

const FormAddTech = () => {

	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		name: ''
	});

	const { name } = formValues;


	//envio a la api
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(startsNewTech(formValues));
	}

	return (
		<div className="login">
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="col mb-3">
					<label>Nombre </label>
					<input
						className="form-control"
						type='text'
						name='name'
						placeholder='Nombre'
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">

					<button
						className="btn2 btn-primary btn-large btn-block"
						type="submit"
					>
						Agregar
					</button>

				</div>
			</form>
		</div>
	)
}

export default FormAddTech;
