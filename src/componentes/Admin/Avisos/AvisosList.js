//Uso de React
import React from 'react'
import { useEffect } from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import SignCard from './SignCard'

export default function AvisosList() {
	
	//Obtención de los videos del estado
	var avisos = useSelector(state => state.avisos);

	//Usar para obtener los avisos de la BD
	useEffect(() => {
	}, [])

	//Despliegue de la cantidad de avisos en BD
	return (
		<>
			<div className='row'>
				<div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap" style={{gap:"5px"}}>
					{
						avisos.avisos.map(aviso => (
							<SignCard
								key={aviso.id}
								{...aviso}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}
