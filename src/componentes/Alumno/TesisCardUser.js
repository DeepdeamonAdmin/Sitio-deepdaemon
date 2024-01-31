//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

const TesisCardUser = (item) => {

    //Despliegue de las tarjetas de las tesis de los alumnos
    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={item.urlImg}
                        alt="project"
                        className="card-img"
                    />
                </div>
                <div className="col-md-5">
                    <div className="card-body">
                        <h5 className="card-title"> {item.name} </h5>
                        <p className="card-text"> {item.descr} </p>
                    </div>
                </div>
                <div className="col-md-1">
                <p>
                        <Link 
                            to={ `/user/tesis/${item.id}/${item}` }
                            className ="btn btn-primary btn-sm">
                                Edit
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TesisCardUser
