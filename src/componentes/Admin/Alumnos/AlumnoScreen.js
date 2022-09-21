import React from 'react';
import { ModalAddAlumno } from './ModalAddAlumno';
import { AddNewFab } from '../../ui/AddNewFab';
//import { SearchScreen } from '../../ui/SearchScreen';
import { AlumnoList } from './AlumnoList';
import { GraduatedList } from './GraduatedList';


// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

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
					{/* <SearchScreen /> */}
					<div className="col-md-2 mb-2">
						<ModalAddAlumno />
						<AddNewFab />
					</div>
				</div>
			</div>
			<div>
				<h3 className="text-center">Alumnos en curso</h3>
				<AlumnoList />
				<h3 className="text-center">Alumnos egresados</h3>
				<GraduatedList />
			</div>
		</>
	)
}