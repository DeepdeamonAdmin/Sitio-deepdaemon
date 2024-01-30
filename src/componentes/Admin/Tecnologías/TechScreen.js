//Uso de React
import React from 'react';

//Componentes necesarios
import FormAddTech from './FormAddTech';

const TechScreen = () => {

	//Pantalla principal de las tecnologías
	return (
		<div className='row'>
			<div>
				<h2> Agregar Tecnología </h2>
				<FormAddTech />
			</div>
		</div>
	);
}

export default TechScreen;
