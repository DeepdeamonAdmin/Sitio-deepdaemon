//Uso de React
import React from 'react'

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

//Componentes necesarios
import ProjectList from './ProjectList'


export const ProjectsScreen = () => {
    
    //Pantalla principal de los proyectos
    return (
        <>
            <div className="Container">
                <div className="row">
                    <div className="col mb-3">
                        <h1> Proyectos DeepDaemon</h1>
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
                <ProjectList />
            </div>
        </>
    )
}
