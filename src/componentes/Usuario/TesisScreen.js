//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { ProjectDetaills } from './ProjectDetaills';

export const TesisScreen = ({ status1, status2 }) => {

	//Obtención d elas tesis del estado
	const tesis  = useSelector(state => state.tesis);

	//Filtrado de las tesis
	var tesis_type = tesis.tesis.filter(tesis => (tesis.estado===status1||tesis.estado===status2));

	//Despliegue de las tarjetas de las tesis
	return (
		<div className="container">
			{tesis_type.length === 0 && <p>No se encontraron tesis por el momento.</p>}
		  <div className="row d-flex flex wrap"style={{gap:"10px"}}>
			{tesis_type.map((t) => (
			  // Imprimir solamente si el estado es igual al seleccionado
			  t.display === "Yes" && (
				  <div className="card" key={t.id} style={{minWidth:150, maxWidth:420}}>
					<div className="row g-0">
					  <div className="col-3 mt-4">
						<img
						  className="card-img"
						  src={t.urlImg}
						  style={{
							objectFit: 'cover',
							objectPosition: 'center',
							height: "100px",
							width: '100px'
						  }}
						  alt="member"
						/>
					  </div>
					  <div className="col-9">
						<div className="card-body text-primary d-flex flex-column h-100">
						  <h6 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							{t.name}
						  </h6>
						  <div className="text-right">
						  <ProjectDetaills color={"primary"} project={t} />
						  </div>
						</div>
					  </div>
					</div>
				  </div>
			  )
			))}
		  </div>
		</div>
	  );
	  
}