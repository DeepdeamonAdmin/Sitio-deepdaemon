import React from 'react'
import { useSelector } from 'react-redux'
import { AlumnoCard } from './AlumnoCard';

export const AlumnoList = ({status}) => {
	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className='row'>
				<div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap" style={{gap:"5px"}}>
					{
						//Solo los usuarios con el grado de current
						usuarios.filter(usuario => (usuario.grado === status&&usuario.rol === "alumno")).map(usuario => (
							<AlumnoCard
								key={usuario.id}
								{...usuario}
							/>
						)
						)}
				</div>
			</div>
		</>
	)
}
