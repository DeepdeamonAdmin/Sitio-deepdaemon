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
<<<<<<< HEAD
			{/*<div className="container card-columns" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",paddingLeft:0,paddingRight:0}}>
				{
					usuarios.map(usuario =>(
						(usuario.grado===status&&usuario.display==="Y")&&(
							<div key={usuario.id} className="row">
								<div className="row mb-4 bg-light ml-4" style={{maxWidth:"350px",minWidth:"100px", height:"130px",borderRadius:"5px"}}>
									<div className="col-sm-6" style={{marginTop:"5px", marginLeft:"5px", marginRight:0,padding:0,width:"110px"}}>
										<img
											className="card-img"
											src={usuario.urlImg}
											alt="member"
											style={{
												width:"100px",
												height: "110px",
												objectFit: "cover",
												objectPosition: 'center'
											}}
										/>
									</div>
									<div className="col pr-0 pl-0" style={{position:"relative", marginTop:"10px",marginRight:0, marginLeft:0}}>
										<div className="card-body text-primary d-flex flex-column h-100 pl-0 pr-0" style={{position:"relative"}}>
											<h5 className="card-title">{usuario.nombre}</h5>
											<div className="text-right pt-0">
												{!user && <ModalCrearCuenta />}
												<VerMas usuario={usuario} />
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					))
				}
			</div>*/}
			{/*<div className="container card-columns">
				<div className="row mb-2" >
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
=======
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
>>>>>>> cb2c80ceb6927e52e0ae5c1ed6f3f23484993422
						</div>
					  </div>
					</div>
				  ))}
				</div>
<<<<<<< HEAD
										</div>*/}
			<div className="container card-colums" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
				{
					usuarios.map(usuario=>(
						usuario.grado===status&&usuario.display==="Y"&&(
							<div key={usuario.id} className="card w-25 mb-4 mr-2" style={{maxWidth:"400px",minWidth:"300px"}}>
								<div className="row-md-1 mb-1 bg-light d-flex" style={{borderRadius:"5px",height:"130px"}}>
									<div className="col-3" style={{margin:"5px",padding:0}}>
										<img
											className="card-img"
											src={usuario.urlImg}
											alt="member"
											style={{
												objectFit: 'cover',
												objectPosition: 'center',
												width:"100px",
												height: "110px",
												objectFit: "cover",
												borderRadius: '5px'
											}}
										/>
									</div>
									<div clasName="col" style={{maxWidth:"250px",marginLeft:"5%"}}>
										<div className="card-body" style={{position:"relative",paddingBottom:0,marginBottom:0}}>
											<h5 className="card-title" style={{height:"50px"}}>
												{usuario.nombre}
											</h5>
											<div className="text-right d-flex" style={{position:"relative",justifyContent:"right"}}>
												{!user && <ModalCrearCuenta />}
												<VerMas usuario={usuario} />
											</div>
										</div>
										
									</div>
									
								</div>
								
							</div>
						)
					))
				}
			</div>
=======
			  ))}
		  </div>
>>>>>>> cb2c80ceb6927e52e0ae5c1ed6f3f23484993422
		</>
	  );	  
}
