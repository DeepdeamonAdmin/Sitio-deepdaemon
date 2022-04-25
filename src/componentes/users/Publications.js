import React from 'react';
import './users.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Publications = () => {

    const { publications } = useSelector( state => state.publications );
            

    return (
    <div className='container'>
        <div className='center-project'>
            <table className='tb-project'>
                <tr className='th-project'>
                    <td className='td-project'>
                        Imagen
                    </td>
                    <td className='td-project'>
                        Tipo
                    </td>
                    <td className='td-project'>
                        Titulo
                    </td>
                    <td className='td-project'>
                        Descripcion
                    </td>
                    <td colSpan={2} className='td-project'>
                        <Link
                            to ='/user/addpublication'
                            className="btn btn-outline-secondary nav-item nav-link"
                        >
                            Agregar Publicacion
                        </Link>
                    </td>
                </tr>
                {
                    publications.map( publication =>(
                        <tr key={publication.id} >
                            <td className='td-project'>
                                <img 
                                    src={ publication.frontImg } 
                                    className='foto-project'
                                    alt="foto-perfil" />
                            </td>
                            <td className='td-project'>
                                {publication.postType}
                            </td>
                            <td className='td-project'>
                                {publication.title}
                            </td>
                            <td className='td-project'>
                                {publication.descripcion}
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
                                    to ='/user/morepublication/a'
                                    //to ={`/user/moreproject/${publication.id}`}
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
