import React from 'react';
import { useSelector } from 'react-redux';
import { TeamDetaills } from './TeamDetaills';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { LeaderDetaills } from './LeaderDetaills';
import { ModalInfoProject } from './ModalInfoProject';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';

// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LeaderScreen = () => {

	const { usuarios } = useSelector(state => state.user);

	return (
		<>
			<div className="card-columns cards-cols animate__animated animate__fadeIn">
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios leader	
						(usuario.grado === "leader" && usuario.display === "Y") && (
							<div className="d-flex flex-row card animate__animated animate__fadeIn border-green mb-4" style={{ MaxWidth: 350, MaxHeight: 150 }}>

								<img
									className="card-img"
									src={usuario.urlImg}
									alt="leader"
									style={{
										height: "200px",
										width: '200px'
									}}
								/>

								<div className="card-body text-dark">
									<h5 className="card-title"> {usuario.nombre} </h5>

									{/* <TeamDetaills color={"dark"} usuario={usuario} /> */}
									<ModalCrearCuenta />
									<VerMas />
								</div>
							</div>
						)
					))
				}
			</div>
		</>
	)
}
