import React from 'react';
import './users.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Projects = () => {

    const { projects } = useSelector( state => state.projects );
            

    return (
    <div className='container'>
        <div className='center-project'>
            <table className='tb-project'>
                <tr className='th-project'>
                    <td className='td-project'>
                        Imagen
                    </td>
                    <td className='td-project'>
                        Nombre
                    </td>
                    <td className='td-project'>
                        Nombre Técnologia
                    </td>
                    <td className='td-project'>
                        Enlace
                    </td>
                    <td colSpan={2} className='td-project'>
                        <Link
                            to ='/user/addproject'
                            className="btn btn-outline-secondary nav-item nav-link"
                        >
                            Agregar Proyecto
                        </Link>
                    </td>
                </tr>
                {
                    projects.map( project =>(
                        <tr key={project.id} >
                            <td className='td-project'>
                                <img 
                                    src={ project.urlImg } 
                                    className='foto-project'
                                    alt="foto-perfil" />
                            </td>
                            <td className='td-project'>
                                {project.name}
                            </td>
                            <td className='td-project'>
                                {project.nameTech}
                            </td>
                            <td className='td-project'>
                                {project.link}
                            </td>
                            <td className='td-project'>
                                <button 
                                className='btn-project-delete'
                                // onClick={ console.log('hola'); } 
                                >
                                    Eliminar
                                </button>   
                            </td>
                            <td className='td-project'>
                                <Link
                                    to ={`/user/moreproject:${project.id}`}
                                    className="btn btn-outline-secondary nav-item nav-link"
                                >
                                    Ver más
                                </Link>
                            </td>
                        </tr>
                    ))       
                }
            </table>
        </div>

    </div>
)
}
