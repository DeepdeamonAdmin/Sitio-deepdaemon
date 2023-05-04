import React from 'react';
import { useSelector } from 'react-redux';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';
import { TeamDetaills } from './TeamDetaills';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { ModalInfoUser } from './ModalInfoUser';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';
import { auto } from '@popperjs/core';
// import {  } from './ProjectDetaills';


export const TeamScreen = ({ status }) => {

	const { usuarios } = useSelector(state => state.user);
	const user = auth.currentUser;

	return (
		<>
			<div className="container card-columns">
				<div className="row" >
					{usuarios.map((usuario) => (
					// Imprimir solamente los usuarios del grado que seleccionó
					usuario.grado === status &&
					usuario.display === "Y" && (
						<div key={usuario.id} className="col-md-12 mb-3">
						<div>
							<div className="card">
								<div className="card-body row align-items-center">
									<div className="col-md-3">
										<img
											className="img-fluid"
											src={usuario.urlImg}
											alt="member"
											style={{
												width:"100px",
												height: "110px",
												objectFit: "cover"
											}}
										/>
									</div>
									<div className="col-md-6">
										<h5 className="card-title">{usuario.nombre}</h5>
									</div>
									<div className="col-md-3 text-right">
										{!user && <ModalCrearCuenta />}
										<VerMas usuario={usuario} />
									</div>
								</div>
							</div>
						</div>
						</div>
					)
					))}
				</div>
			</div>
		</>
  );
}
