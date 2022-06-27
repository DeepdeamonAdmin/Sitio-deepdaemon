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
                            <div className='d-flex flex-row card animate__animated animate__fadeIn border-dark mb-3' style={{ MaxWidth: 350, MaxHeight: 150 }}>
                                <img
                                    className='card-img'
                                    src={usuario.urlImg}
                                    alt='member'
                                    style={{
                                        height: '200px',
                                        width: '200px'
                                    }}
                                />

								<div className="card-body text-dark">
									<h5 className="card-title"> {usuario.nombre} </h5>
								</div>
							</div>
						)
					)}
			</div>
		</>
	)
}
