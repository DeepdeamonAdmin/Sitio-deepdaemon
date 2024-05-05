//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import ProjectCard from './ProjectCard';

const ProjectList = () => {

    //Obtención de los proyectos del estado
    const { projects } = useSelector(state => state.projects);
    
    //Despliegue de las tarjetas de los proyectos
    return (
        <>
            <div className='row'>
                <div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap justify-content-between" style={{gap:"5px"}}>
                    {
                        projects.map(item => (
                            <ProjectCard
                                key={item.id}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectList
