import React from 'react'
import { useSelector } from 'react-redux'
import { AlumnoCard } from './AlumnoCard';

export const AlumnoList = () => {
	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn px-5">
				{
					//Solo los usuarios con el grado de current y display = Y
					usuarios.filter(usuario => usuario.grado === 'current' && usuario.display === 'Y' ).map(usuario => (
						<AlumnoCard
							key={usuario.id}
							{...usuario}
						/>
					)
					)}
			</div>
		</>
	)
}
