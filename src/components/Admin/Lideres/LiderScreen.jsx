//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

//Componentes necesarios
import { LiderList } from './LiderList';

export const LiderScreen = () => {

    //Despliegue de la pantalla principal de los líderes
    return (
    <>
        <div className="Container">
            <div className="row">
                <div className="col mb-3">
                    <h1> Líderes DeepDaemon </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 mb-2">
                    <Link to={`agregar`} className="btn btn-primary fab">
                    <i className="fas fa-plus"></i>
                    </Link>
                </div>
            </div>
        </div>
        <div>
            <LiderList status="current"/>
        </div>
    </>
    )
}
