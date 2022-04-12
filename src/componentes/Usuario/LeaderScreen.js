import React from 'react';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';

// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LeaderScreen = () => {

	const status = 'leader';

	const { data: leader, loading } = useGet(getMemberStatus, status);


	return (
		<>
			{loading && <p className="animate__animated animate__flash">Loading</p>}
			<div className="card-columns animate__animated animate__fadeIn">
				{
					leader.map(item => (
						<div className="card ms-3 animate__animated animate__fadeIn" style={{ MaxWidth: 540, height: 120 }}>
							{console.log(item)}
							<div className='row'>
								<div className="col-md-4">
									<img
										className="card-img"
										style={{ height: 120 }}
										src={`../../../../media/team/user.png`}
										alt="member"
									/>
								</div>
								<div className="col-md-5">
									<div className="card-body">
										<h5 className="card-title"> {item.name} </h5>
										<ControlModal idModal={item.id} />
										<ModalInfoProject item={item} key={item.id} />
										<p className="card-text"> {item.email} </p>
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
