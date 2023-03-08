import React from 'react';
import './users.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddNewFab } from './AddNewFab';
import { ModalAddrelease } from './ModalAddrelease';

export const Publications = () => {

    const { publications } = useSelector( state => state.publications );
    const {rol} = useSelector(state => state.user)            

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
                    <ModalAddrelease />
                    <AddNewFab /> 
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
                                {publication.postType ? publication.postType : 'Sin tipo'}
                            </td>
                            <td className='td-project'>
                                {publication.title ? publication.title : 'Sin título'}
                            </td>
                            <td className='td-project'>
                                {publication.descripcion ? publication.descripcion : 'Sin descripción'}
                            </td>
                            {/* <td className='td-project'>
                                <button 
                                className='btn-project-delete'
                                // onClick={ console.log('hola'); } 
                                >
                                    Eliminar
                                </button>   
                            </td> */}
                            <td className='td-project'>
                                <Link
                                    // to ='/user/morepublication/a'
                                    to ={rol === 'administrador' ? `editPub/${publication.id}` : `/user/morepublication/${publication.id}`}
                                    className="btn btn-outline-secondary nav-item nav-link"
                                >
                                    {rol === 'administrador' ? 'Editar' : 'Ver más'}
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
