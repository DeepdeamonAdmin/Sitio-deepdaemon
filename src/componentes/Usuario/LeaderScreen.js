import React from 'react';
import { useSelector } from 'react-redux';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';

export const LeaderScreen = ({ status }) => {

  const { usuarios } = useSelector(state => state.user);
	return (
		<>
			<div className="container card-columns pl-0 pr-0" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios leader	
						(usuario.grado === "leader" && usuario.display === "Y" && usuario.idWork === status) && (
							<div className= "row" style={{width:"450px"}} >
								<div className="col-8 pr-0">
									<img
										className="imageleader"
										src={usuario.urlImg}
										alt="leader"
									/>
								</div>

								<div className="col-4 pl-0 pr-0">
									<br></br>
									<h5 className=""> {usuario.nombre} </h5>
									{/* <TeamDetaills color={"dark"} usuario={usuario} /> */}
									<ModalCrearCuenta />
									<VerMas usuario = {usuario}/>
								</div>
							</div>
						)
					))
				}
			</div>
		</>
	)
  }
