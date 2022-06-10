import React from 'react'
import { useForm } from '../../../hooks/useForm';

export default function FormAddSign() {
	const [formValues, handleInputChange] = useForm({
		name: '',
		descr: '',
		icon: '',
	});

	const { name, descr, icon } = formValues;
	const handleSubmit = (e) => {
		// e.preventDefault();
		// dispatch( registerTech(formValues) );
		console.log(e);
	}
	return (
		<div className="section">
			<h1>Formulario de avisos</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="col mb-3">
					<label>Titulo </label>
					<input
						className="form-control"
						type='text'
						name='name'
						placeholder='Name'
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label> Información </label>
					<textarea
						className="form-control"
						rows='5' cols='40'
						name='descr'
						placeholder='Desciption'
						value={descr}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col mb-3">
					<label>Seleccione una foto </label>
					<input
						className="form-control"
						type='file'
						name='icon'
						value={icon}
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
