import React from 'react';
import { useSelector } from 'react-redux';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';

export const LeaderScreen = ({ status }) => {
	

  // La colocamos
  if (targetUser) {
    const rowIndex = 1; // Second row
    const columnIndex = 1; // Second column

	return (
		<>
			<div className="container card-columns" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios leader	
						(usuario.grado === "leader" && usuario.display === "Y" && usuario.idWork === status) && (
							<div className= "row mb-4" style={{width:"430px"}} >
								<div className="col ml-2">
									<img
										className="imageleader"
										src={usuario.urlImg}
										alt="leader"
									/>
								</div>

								<div className="col pl-0">
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
}
