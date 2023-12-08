import React from 'react';
import { useSelector } from 'react-redux';
import { ExternoCard } from './ExternoCard';

export const ExternoList = () => {
	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className='row'>
				<div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap" style={{gap:"5px"}}>
					{
						//Solo los usuarios con el rol externos
						usuarios.filter(usuario => usuario.rol === 'externo').map(usuario => (
							<ExternoCard
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
