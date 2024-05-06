//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';

export const LeaderScreen = ({ status }) => {

	//Obtención de los usuarios del estado
  const { usuarios } = useSelector(state => state.user);

	//Despliegue de la pantalla de los líderes
	return (
		<>
			<div className="container card-columns pl-0 pr-0" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
				{
					usuarios.map(usuario => (
						//Imprimir solamente los usuarios leader	
						(usuario.grado === "leader" && usuario.display === "Y" && usuario.idWork === status) && (
							<div className= "row" style={{width:"450px"}} key={usuario.id}>
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
