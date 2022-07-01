import React from 'react'
import { useSelector } from 'react-redux'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { LiderCard } from './LiderCard';

export const LiderList = () => {

    const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
                    //Solo los usuarios con el grado de leader
                    usuarios.filter(usuario => usuario.grado === 'leader').map(usuario => (
						
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
