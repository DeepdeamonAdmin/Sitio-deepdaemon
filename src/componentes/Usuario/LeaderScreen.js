import React from 'react';
import { useSelector } from 'react-redux';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMas } from '../ui/VerMas';
import { auth } from '../../firebase/firebase-config';

<<<<<<< HEAD
export const LeaderScreen = ({ status }) => {
	
=======
export const LeaderScreen = () => {
  const { usuarios } = useSelector(state => state.user);
  const user = auth.currentUser;

  //Se filtran usuarios "leader"
  const activeLeaders = usuarios.filter(usuario => usuario.grado === "leader" && usuario.display === "Y");

  //Encontramos y movemos la sta Jessica para colocarla en la segunda fila y segunda columna
  const targetUser = activeLeaders.find(usuario => usuario.email === "iessica.becerra@gmail.com");
  const filteredLeaders = activeLeaders.filter(usuario => usuario.email !== "iessica.becerra@gmail.com");
  
  const remainingLeadersInRows = filteredLeaders.reduce((rows, usuario, index) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(usuario);
    return rows;
  }, []);
>>>>>>> cb2c80ceb6927e52e0ae5c1ed6f3f23484993422

  // La colocamos
  if (targetUser) {
    const rowIndex = 1; // Second row
    const columnIndex = 1; // Second column

<<<<<<< HEAD
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
=======
    // Si la segunda fila existe insertamos al usuario en la segunda columnan
    if (remainingLeadersInRows.length > rowIndex) {
      remainingLeadersInRows[rowIndex].splice(columnIndex, 0, targetUser);
    } else {
      //Si no la creamos
      remainingLeadersInRows.push([targetUser]);
    }
  }

  return (
    <>
      <div className="container" style={{padding: "35px"}}>
        {remainingLeadersInRows.map((row, rowIndex) => (
          <div key={rowIndex} className="row mb-3">
            {rowIndex === 1 ? (
              // Solo representa al usuario objetivo en la segunda fila
              <>
                <div className="col-md-4"></div>
                <div key={row[0].id} className="col-md-4">
                  <div className="card">
                    <div className="card-body row align-items-center">
                      <div className="col-md-5">
                        <img
                          className="img-fluid"
                          src={row[0].urlImg}
                          alt="leader"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{row[0].nombre}</h5>
                        {!user && <ModalCrearCuenta />}
                        <VerMas usuario={row[0]} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </>
            ) : (
              // Renderizar otras filas normalmente
              row.map(usuario => (
                <div key={usuario.id} className="col-md-4">
                  <div className="card">
                    <div className="card-body row align-items-center">
                      <div className="col-md-5">
                        <img
                          className="img-fluid"
                          src={usuario.urlImg}
                          alt="leader"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{usuario.nombre}</h5>
                        {!user && <ModalCrearCuenta />}
                        <VerMas usuario={usuario} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </>
  );
};
>>>>>>> cb2c80ceb6927e52e0ae5c1ed6f3f23484993422
