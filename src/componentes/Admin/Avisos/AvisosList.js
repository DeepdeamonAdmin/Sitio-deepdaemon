import React from 'react'
import SignCard from './SignCard'

import azul from "../../../assets/azul.jpg";
import verde from "../../../assets/verde.jpg";

export default function AvisosList() {

	const handleDelete = (e) => {

	}
	return (
		<div className="section card-columns animate__animated animate__fadeIn">
			{
				// member.map(item => (

				// 	//Verificar si status es igual a "leader"
				// 	item.status === "leader" && (
				// 		<SignCard
				// 			key={item.id}
				// 			{...item}
				// 		/>
				// 	)
				// ))
				<div className=''>
					<div className="card w-50 p-2 d-flex flex-row">
						<img className="card-img-top " src={azul} alt="Card image cap" />
						<p>
							<button
								type="button"
								className="btn btn-success btn-sm"
								onClick={handleDelete}>Delete</button>
						</p>
						<p>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
							>Información</button>
						</p>
					</div>
					<div className="card w-50 p-2 d-flex flex-row">
						<img className="card-img-top" src={verde} alt="Card image cap" />
						<p>
							<button
								type="button"
								className="btn btn-success btn-sm"
								onClick={handleDelete}>Delete</button>
						</p>
						<p>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
							>Información</button>
						</p>
					</div>
				</div>
			}
		</div>
	)
}
