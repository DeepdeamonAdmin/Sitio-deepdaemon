import React from 'react';
import { useSelector } from 'react-redux';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { TeamDetaills } from './TeamDetaills';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { ModalInfoUser } from './ModalInfoUser';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';
// import {  } from './ProjectDetaills';


export const TeamScreen = ({ status }) => {


	const { usuarios } = useSelector(state => state.user);
	const user = auth.currentUser;

	return (
		<>

			<div className="container card-columns">
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios del grado que selecciono
						(usuario.grado === status && usuario.display === "Y") && (
							<div className="row mb-4">
								<div className='col'>
									<img
										className="img-fluid"
										src={usuario.urlImg}
										alt="member"
										style={{
											width:"200px",
											height: "300px",
											objectFit: "cover"
										}}
									/>
								</div>

								<div className="col">
									<h5 className="card-title"> {usuario.nombre} </h5>

									{/*Arreglar este perro codigo porque no jala con el modal */}
									{!user? <ModalCrearCuenta />: <TeamDetaills usuario={usuario} />}
									{console.log("Activo o nel :"+user)}
									{/*<ModalInfoUser usuario={usuario}/>*/}

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