//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

const TesisCardUser = (item) => {
  //Despliegue de las tarjetas de las tesis
  return (
    <div
      className="card ms-3 animate__animated animate__fadeIn"
      style={{ maxWidth: 700 }}
    >
      <div className="row no-gutters">
        <div className="col-3 mt-2 ml-2 mr-2 mb-2">
          <img
            src={item.urlImg}
            alt="project"
            className="card-img"
            style={{
              marginLeft: '10px',
              width: '150px',
              height: '150px',
              borderRadius: '7%',
            }}
          />
        </div>
        <div className="col-6 ml-0 mr-0">
          <div className="card-body">
            <h5 className="card-title"> {item.name} </h5>
            <p className="card-text"> {item.descr} </p>
          </div>
        </div>
        <div className="col-2 mr-0 ml-4">
          <p>
            <Link
              to={`/admin/tesis/${item.id}/${item}`}
              className="btn btn-primary btn-sm"
            >
              Editar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TesisCardUser;
