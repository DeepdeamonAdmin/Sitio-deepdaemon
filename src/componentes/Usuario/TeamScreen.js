import React from 'react';
import { useSelector } from 'react-redux';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';


export const TeamScreen = ({ status }) => {

	const { usuarios } = useSelector(state => state.user);
	const user = auth.currentUser;

	return (
		<>
			<div className="container">
				<div className="row d-flex flex-wrap justify-content-center ml-1">
				{usuarios.map(usuario => usuario.grado===status&&usuario.display==="Y"&&usuario.rol=="alumno"&&(
						<div className="col-3 d-flex" key={usuario.id} style={{minWidth:"350px",flexWrap:"wrap",paddingRight:0, paddingLeft:"10px"}}>
							<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ height: 130, width:"100%", position: 'relative' }}>
								<div className='row justify-content-left d-flex' style={{width:"100%"}}>
									<div className='col-4 col-sm-auto col-md-auto col-lg-auto col-xl-auto d-flex align-items-center pr-0'>
										<img
											className="card-img ml-3 mr-0 pr-0"
											src={usuario.urlImg}
											style={{
											objectFit: 'cover',
											objectPosition: 'center',
											height: "110px",
											width: '100px',
											borderRadius: '5px'
											}}
											alt="member"
										/>
									</div>
									<div className='col pl-0 mt-2'>
										<div className="card-body" style={{position:"relative"}}>
											<h6 className="card-title" style={{
												display: '-webkit-box',
												WebkitLineClamp: 5,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												maxHeight: '5.9em',
											}}>
												{usuario.nombre}
											</h6>
											<div className="text-right d-flex" style={{position:"absolute", top:"50px", right:"0px",justifyContent:"right"}}>
												{!user && <ModalCrearCuenta />}
												<VerMas usuario={usuario} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				}
				</div>
			</div>
		</>
	  );	  
}
