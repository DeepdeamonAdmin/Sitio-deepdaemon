//Uso de React
import React from 'react'

//Uso de Link para la navegación
import { Link } from 'react-router-dom';

//Componentes necesarios
import AvisosList from './AvisosList';

export default function AvisosScreen() {

	//Contenedor donde se desplegarán los avisos
	return (
		<>
			<div className="Container">
				<div className="row">
					<div className="col mb-3">
						<h1> Avisos</h1>
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
				<AvisosList />
			</div>
		</>
	)
}
