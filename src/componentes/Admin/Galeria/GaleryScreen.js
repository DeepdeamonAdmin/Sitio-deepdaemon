import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'
import azul from "../../../assets/azul.jpg";
import verde from "../../../assets/verde.jpg";
import rojo from "../../../assets/rojo.jpg";
import rosa from "../../../assets/rosa.jpg";
// import d from "../../../../public/media/team/calvoh.jpg"
export const GaleryScreen = () => {
	return (
		<div>
			<h1>Pagina Galeria</h1>
			<ModalAddGalery />
			<AddNewFab />
			<div className='section'>
				<div className="card-columns">
					<div className="card">
						<img className="card-img-top" src={azul} alt="Card image cap" />
					</div>
					<div className="card w-50">
						<img className="card-img-top" src={verde} alt="Card image cap" />
					</div>
					<div className="card w-75">
						<img className="card-img-top" src={rojo} alt="Card image cap" />
					</div>
					<div className="card ">
						<img className="card-img-top" src={rosa} alt="Card image cap" />
					</div>
					<div className="card text-center w-50">
						<img className="card-img-top" src={rosa} alt="Card image cap" />
					</div>
					<div className="card">
						<img className="card-img-top" src={rojo} alt="Card image cap" />
					</div>
					<div className="card">
						<img className="card-img-top" src={azul} alt="Card image cap" />
					</div>
					<div className="card">
						<img className="card-img-top" src={verde} alt="Card image cap" />
					</div>
				</div>
			</div>
		</div>

	)
}
