//Uso de React
import React from 'react';

//Componentes necesarios
import FormAddCareer from './FormAddCareer';

const CarrerasScreen = () => {

	//Despliegue de la vista principal del apartado de carreras
	return (
		<div className='col'>
			<h2> Agregar Carrera </h2>
			<hr />
			<FormAddCareer />
		</div>
	);
}

export default CarrerasScreen;
