//Uso de React
import React from 'react'

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

//Componentes necesarios
import TesisListUser from './TesisListUser'

export const Tesis = () => {
    
    //Despliegue de las tesis en los alumnos
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <h1>Tesis</h1>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Link to='/alumno/addtesisgrado' className="btn btn-primary btn-lg btn-block">
                            <i className="fas fa-plus"></i> Tesis para Licenciatura
                        </Link>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Link to='/alumno/addtesismaestria' className="btn btn-primary btn-lg btn-block">
                            <i className="fas fa-plus"></i> Tesis para Maestría
                        </Link>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Link to='/alumno/addtesisdoctorado' className="btn btn-primary btn-lg btn-block">
                            <i className="fas fa-plus"></i> Tesis para Doctorado
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <TesisListUser />
            </div>
        </>
    )
}
