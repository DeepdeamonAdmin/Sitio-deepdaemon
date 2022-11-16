import React from 'react';
import { useSelector } from 'react-redux';
import { TeamDetaills } from './TeamDetaills';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { LeaderDetaills } from './LeaderDetaills';
import { ModalInfoProject } from './ModalInfoProject';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { ModalInfoLider } from './ModalInfoLider';
import { ModalInfoUser } from './ModalInfoUser';
import { ModalInfoLeader } from './ModalInfoLeader';


import { VerMas } from '../ui/VerMas';

// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LeaderScreen = () => {
	

	const { usuarios } = useSelector(state => state.user);

	return (
		<>
			<div className="container card-columns">
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios leader	
						(usuario.grado === "leader" && usuario.display === "Y") && (
							<div className= "row mb-4">
								<div className="col ml-3">
									<img
										className="img-fluid"
										src={usuario.urlImg}
										alt="leader"
										
									/>
								</div>

								<div className="col">
									<h5 className=""> {usuario.nombre} </h5>

									{/* <TeamDetaills color={"dark"} usuario={usuario} /> */}
									
									<ModalCrearCuenta />
									<VerMas/>
								</div>
							</div>
						)
					))
				}
			</div>
		</>
	)
}
