//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

const PublicacionesCard = (item) => {
  //Despliegue de las tarjetas de las publicaciones
  return (
    <div className="card ms-3" style={{ maxWidth: 450, height: 290 }}>
      <div className="row no-gutters pl-2 mr-2" style={{ height: 80 }}>
        <h6 className="card-title mt-3 text-sm" style={{ textAlign: 'center' }}>
          {item.title}
        </h6>
      </div>
      <div
        className="row no-gutters d-flex justify-content-between position-relative pr-4 mr-4 pl-2"
        style={{ height: 120 }}
      >
        <div className="col-md-4 d-flex align-items-stretch">
          <img src={item.urlImg} alt="publish" className="imageleader2" />
        </div>
        <div className="col-md-1">
          <p>
            <Link
              to={`/admin/release/editPub/${item.id}`}
              className="btn btn-primary btn-sm"
            >
              Editar
            </Link>
          </p>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="card-body d-flex tp-0 pt-0">
          <p className="badge bg-primary text-wrap tp-0 pt-0"> {item.autor} </p>
        </div>
      </div>
    </div>
  );
};

export default PublicacionesCard;
