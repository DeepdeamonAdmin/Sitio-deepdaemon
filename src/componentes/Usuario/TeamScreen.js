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
			{usuarios
			  .filter(
				(usuario) => usuario.grado === status && usuario.display === "Y"
			  )
			  .reduce((rows, usuario, index) => {
				if (index % 3 === 0) rows.push([]);
				rows[rows.length - 1].push(usuario);
				return rows;
			  }, [])
			  .map((row, rowIndex) => (
				<div key={rowIndex} className="row mb-3">
				  {row.map((usuario) => (
					<div key={usuario.id} className="col-md-4">
					  <div className="card">
						<div className="card-body row align-items-center">
						  <div className="col-md-3">
							<img
							  className="img-fluid"
							  src={usuario.urlImg}
							  alt="member"
							  style={{
								width: "100px",
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
				  ))}
				</div>
			  ))}
		  </div>
		</>
	  );	  
}
