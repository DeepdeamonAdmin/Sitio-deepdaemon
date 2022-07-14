import React from 'react'
import { useDispatch } from 'react-redux';
import { startsNewInstitution } from '../../../actions/institutions';
// import { registerInstitution } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';

const FormAddInstitution = () => {

	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		name: '',
		shortName: ''
	});

	const { name, shortName } = formValues;

	//envio a la api
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(startsNewInstitution(formValues))
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<div className="col mb-3">
					<label> Institución </label>
					<input
						className="form-control"
						type='text'
						name='name'
						placeholder='Institución'
						// value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Siglas</label>
					<input
						className="form-control"
						type='text'
						name='shortName'
						placeholder='Siglas'
						// value={shortName}
						onChange={handleInputChange}
					/>
				</div>
				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"
				>
					Agregar
				</button>
			</form>
		</div>

	)
}

export default FormAddInstitution
