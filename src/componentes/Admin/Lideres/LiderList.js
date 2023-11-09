import React from 'react'
import { useSelector } from 'react-redux'
import { LiderCard } from './LiderCard';

export const LiderList = () => {

	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn px-5">
				{
					//Solo los usuarios con el grado de leader
					usuarios.filter(usuario => usuario.grado === 'leader' && usuario.display === 'Y' ).map(usuario => (

						<LiderCard
							key={usuario.id}
							{...usuario}
						/>
					)
					)}
			</div>
		</>
	)

}
