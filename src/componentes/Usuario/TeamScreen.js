import React from 'react';
import { useSelector } from 'react-redux';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { ControlModal } from './ControlModal';


export const TeamScreen = ({ status }) => {

	const { usuarios } = useSelector(state => state.user);

	return (
		<>

			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios del grado que selecciono
						(usuario.grado === status) && (
							<div className="d-flex flex-row card animate__animated animate__fadeIn border-dark mb-3" style={{ width: 340 }}>

								<img
									className="card-img"
									src={usuario.urlImg}
									alt="member"
									style={{
										height: "200px",
										width: '200px'
									}}
								/>

								<div className="card-body text-dark">
									<h5 className="card-title"> {usuario.nombre} </h5>
									<ControlModal color={"dark"} idModal={usuario.id} />
								</div>


							</div>
						)
					))
				}
			</div>
		</>
	)
}