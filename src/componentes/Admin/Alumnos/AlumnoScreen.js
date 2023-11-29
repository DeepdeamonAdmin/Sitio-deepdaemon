import React from 'react';
import { AlumnoList } from './AlumnoList';
import { Link } from 'react-router-dom';

export const AlumnoScreen = () => {
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