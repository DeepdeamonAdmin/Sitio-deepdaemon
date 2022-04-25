import React from 'react';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';

// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LeaderScreen = () => {

	const status = 'leader';

	const { data: leaders, loading } = useGet(getMemberStatus, status);


	return (
		<>
			{loading && <p className="animate__animated animate__flash">Loading</p>}
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
					leaders.map(leader => (
						<div className="d-flex flex-row card animate__animated animate__fadeIn border-success mb-3" style={{ width: 380, Maxheight: 150 }}>
							{/* {console.log(leader)} */}
							<img
								className="card-img"
								style={{
									height: "150px",
									width: "150px"
								}}
								src={`../../../../media/team/user.png`}
								// leader.photo_filename
								alt="member"
							/>
							<div className="card-body text-success">
								<h5 className="card-title"> {leader.name} </h5>
								<ControlModal color={"success"} idModal={leader.id} />
								{/* <ModalInfoProject item={leader} key={leader.id} /> */}
							</div>
						</div>

					))
				}
			</div>
		</>
	)
}
