//Uso de React
import React from 'react'

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Componentes necesarios
import { startsNewInstitution } from '../../../actions/institutions';

const FormAddInstitution = () => {

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Contenido del formulario para una nueva institución
	const [formValues, handleInputChange] = useForm({
		name: '',
		shortName: ''
	});
	const { name, shortName } = formValues;

	//Función para subir una nuve institución
	const handleSubmit = (e) => {
		e.preventDefault();

		//Envio al estado la nueva institución
		dispatch(startsNewInstitution(formValues))
	}

	//Despliegue del formulario para ñadir una nueva institución
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
