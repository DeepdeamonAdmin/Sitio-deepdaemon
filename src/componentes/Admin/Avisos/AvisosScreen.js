import React from 'react'
import AvisosList from './AvisosList';
import { Link } from 'react-router-dom';

export default function AvisosScreen() {
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
