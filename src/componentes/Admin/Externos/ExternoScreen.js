//Uso de React
import React from 'react';

//Componentes necesarios
import { ModalAddAlumno } from '../Alumnos/ModalAddAlumno';
import { AddNewFab } from '../../ui/AddNewFab';
import { ExternoList } from './ExternoList';

export const ExternoScreen = () => {
    
    //Despliegue de la lista de los usuarios externos
    return (
        <>
			<div className="Container">
				<div className="row">
					<div className="col mb-3">
						<h1> Externos DeepDaemon </h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 mb-2">
						<ModalAddAlumno />
						<AddNewFab />
					</div>
				</div>
			</div>
            <div>
				<h3 className="text-center">Externos Inscritos</h3>
				<ExternoList />
			</div>
		</>
    )
}
