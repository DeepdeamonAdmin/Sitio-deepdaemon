//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector } from 'react-redux'

//Componentes necesarios
import { AlumnoCard } from './AlumnoCard';

export const AlumnoList = ({status}) => {

	//Cargar todos los usuarios del estado
	const { usuarios } = useSelector(state => state.user);

	//Creación de las tarjetas necesarias para los alumnos filtrados
	return (
		<>
			<div className='row'>
				<div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap" style={{gap:"5px"}}>
					{
						//Filtro para los alumnos con el atributo cargado en "status"
						usuarios.filter(usuario => (usuario.grado === status&&usuario.rol === "alumno")).map(usuario => (
							<AlumnoCard
								key={usuario.id}
								{...usuario}
							/>
						)
					)}
				</div>
			</div>
		</>
	)
}
