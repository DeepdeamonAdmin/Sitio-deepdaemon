import React from 'react';
import { useSelector } from 'react-redux';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { ControlModal } from './ControlModal';


export const TeamScreen = ({ status }) => {

	const { usuarios } = useSelector( state => state.user );

	return (
		<>

			
			<div className="card-columns animate__animated animate__fadeIn">
				{
					usuarios.map(usuario => (
						<div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
							<div className="row no-gutters">
								<div className="col-md-4">
									<img
										src={usuario.urlImg}
										alt="member"
										className="card-img"
									/>
								</div>
								<div className="col-md-5">
									<div className="card-body">
										<h5 className="card-title"> {usuario.nombre} </h5>
										<ControlModal idModal={usuario.id} />
										{/* <p className="card-text"> {item.email} </p> */}
									</div>
								</div>

							</div>
						</div>
					))
				}
			</div>
		</>
	)
}