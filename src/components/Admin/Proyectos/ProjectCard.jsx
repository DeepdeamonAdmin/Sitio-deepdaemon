//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

const ProjectCard = (item) => {
  //Despliegue de las tarjetas de los proyectos
  return (
    <div
      className="card ms-3 animate__animated animate__fadeIn"
      style={{ maxWidth: 700 }}
    >
      <div className="row no-gutters">
        <div className="col-md-12 mb-3">
          <div className="card-body row align-items-center">
            <div className="col-md-3">
              <img
                className="img-fluid"
                src={item.urlImg}
                alt="proyect"
                style={{
                  width: '150px',
                  height: '150px',
                  objectfit: 'scale-down',
                }}
              />
            </div>
            <div className="col-md-6">
              <h5 className="card-title"> {item.name} </h5>
              <p className="card-text"> {item.descr} </p>
            </div>
            <div className="col-md-3 text-right">
              <p>
                <Link
                  to={`/admin/projects/${item.id}/${item}`}
                  className="btn btn-primary btn-md"
                >
                  Editar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
