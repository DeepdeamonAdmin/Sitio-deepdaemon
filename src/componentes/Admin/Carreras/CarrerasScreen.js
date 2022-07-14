import React from 'react';
import FormAddCareer from './FormAddCareer';

const CarrerasScreen = () => {

	return (
		<div className='col'>
			<h2> Agregar Carrera </h2>
			<hr />
			<FormAddCareer />
			{/* <div className='d-flex flex-column'>
				{
					instituciones.map(inst => (
						<span className='p-2'>{inst.name}</span>
					))
				}
			</div> */}
		</div>
	);
}

export default CarrerasScreen;
