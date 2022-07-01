import React from 'react'
import { useSelector } from 'react-redux'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { MemberCard } from './MemberCard';

export const MemberList = () => {

	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
					usuarios.map(usuario => (
						//Imprimir todos los usuarios
						<MemberCard
							key={usuario.id}
							{...usuario}
						/>
					)
					)}
			</div>
		</>
	)
}
