import React from 'react';
import { useSelector } from 'react-redux';
import FormAddInstitution from './FormAddInstitution';

const InstitucionesScreen = () => {
	const { instituciones } = useSelector(state => state.institutions)
	// console.log(instituciones);
	return (
		<div className='col'>
			<h2> Agregar Institución </h2>
			<hr />
			<FormAddInstitution />
			<div className='d-flex flex-column'>
				{
					instituciones.map(inst => (
						<span className='p-2'>{inst.name}</span>
					))
				}
			</div>
		</div>
	);

}

export default InstitucionesScreen;
