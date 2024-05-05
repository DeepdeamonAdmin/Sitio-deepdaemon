//Uso de React
import React from 'react';

//Uso de Link para la navegación
import { Link } from 'react-router-dom';

//Componentes necesarios
import { AlumnoList } from './AlumnoList';

export const AlumnoScreen = () => {

	//Pantalla principal del apartado de alumnos
	return (
		<>
			<div className="Container">
				<div className="row">
					<div className="col mb-3">
						<h1> Alumnos DeepDaemon </h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 mb-2">
						<Link to={`agregar`} className="btn btn-primary fab">
                        <i className="fas fa-plus"></i>
						</Link>
					</div>
				</div>
			</div>
			<div>
				<h3 className="text-center">Alumnos en curso</h3>
				<AlumnoList status="current"/>
				<h3 className="text-center">Alumnos egresados</h3>
				<AlumnoList status="graduate" />
			</div>
		</>
	)
}