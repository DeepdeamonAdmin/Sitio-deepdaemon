import React from 'react'
import { useSelector } from 'react-redux'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { AlumnoCard } from './AlumnoCard';

export const AlumnoList = () => {
    const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
                    //Solo los usuarios con el grado de current
                    usuarios.filter(usuario => usuario.grado === 'current').map(usuario => (
						
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
