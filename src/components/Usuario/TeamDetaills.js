//Uso de React
import React, { useState } from 'react'

//Uso de Popup
import Popup from 'reactjs-popup';

//Componentes necesarios
import 'reactjs-popup/dist/index.css';
import "../../styles/DeepDaemon.css";

export const TeamDetaills = ({usuario }) => {

	//Configuración del hook para mostrar información
	const [showInf, setShowInfo] = useState(false)

	//Obtención del usuario
	const usuarioF = usuario.usuario;

	//Función para manejar el clic
	const handleClickNew = () => {
		setShowInfo(!showInf)
	}

	//Despliegue de los detalles de los alumnos
	return (
		<>
			<Popup //aqui inicia el modal que abrira la informacion de los alumnos
            trigger={<button //Boton que activa el pop up
					className={"btn btn-primary"}
					onClick={handleClickNew}>
					{!showInf ? "Ver más.." : "Ver menos"}
			</button>}
            modal
            nested
        >
            {close => (
            <div className="modal-team">
                
                <div className="modalheader bg-primary"> {usuarioF.nombre} </div>
                <div className="modalcontent">
                {' '}				
                <div className='d-flex flex-col animate__animated animate__fadeIn'>
						<img
							className="img-fluid"
							src={usuarioF.urlImg}
							alt="member"
							style={{
								width:"200px",
								height: "300px",
								objectFit: "cover"
							}}
						/>	
						<ul class="list-group list-group-flush">
							<li className={`list-group-item`}><b>Sobre mi:</b><i>{usuarioF.descripcion}</i></li>
							<li className="list-group-item">{usuarioF.titulo ? `Titulo de Tesis: ${usuarioF.titulo}` : "Sin tesis"}</li>
							<li className="list-group-item">Email: {usuarioF.email}</li>
						</ul>
				</div>
                </div>
                    <div className="modalactions">
                        <button //boton para cerrar el modal en pop up 
                            className={`btn btn-primary`}
                            onClick={() => {
                            console.log('modal closed '); 
                            close();
                        }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </Popup>
		</>
	)
}
