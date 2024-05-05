//Uso de React
import React from 'react'

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Componente necesario
import { startsNewCareer } from '../../../actions/Careers';


const FormAddCareer = () => {

	//Declaración del dispatch
	const dispatch = useDispatch();

	//Contenido del formulario para una nueva carrera
	const [formValues, handleInputChange] = useForm({
		name: '',
	});
	const { name } = formValues;

	//Función para subir una nueva carrera
	const handleSubmit = (e) => {
		e.preventDefault();

		//Enviar al estado la nueva carrera
		dispatch(startsNewCareer(formValues))
	}

	//Despliegue del formulario para una nueva carrera
	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<div className="col-mp-4 mb-3">
					<label> Carrera</label>
					<input
						className="form-control"
						type='text'
						name='name'
						placeholder='Carrera'
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

export default FormAddCareer
