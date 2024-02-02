//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

//Uso de Redux
import { useSelector } from 'react-redux';

//Uso de Firestore
import { getAuth } from 'firebase/auth';

//Componentes necesarios
import './users.css'
import { AddNewFab } from './AddNewFab';
import { ModalAddrelease } from './ModalAddrelease';

export const Publications = () => {

    //Obtención de la autenticación del usuario
    const auth = getAuth();
    const currentUser = auth.currentUser.displayName;

    // Estas son todas las publicaciones que hay en la BD
    const { publications } = useSelector( state => state.publications );

    // Aquí se obtiene el rol del usuario que está autenticado en este momento
    const {rol} = useSelector(state => state.user)

    // En esta variable se guardan las publicaciones que el usuario autenticado en este momento ha hecho
    const userPublications = publications.filter(publication => publication.publisher === currentUser)

    // Esta variable guardará todas las publicaciones si el usuario autenticado es administrador
    // ya que el admin debe poder ver todas las publicaciones, en caso contrario solo contendrá las publicaciones
    // del usuario autenticado, este es un arreglo que se va aiterar para construir la tabla de las publicaciones
    const publicationsTable = rol === 'administrador' ? publications : userPublications

    //Despliegue de las publicaciones en los alumnos
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
                    publicationsTable.map( publication =>(
                        <tr key={publication.id} >
                            <td className='td-project'>
                                <img 
                                    src={ publication.urlImg } 
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
                            <td className='td-project'>
                                <Link
                                    to ={`/alumno/editPublication/${publication.id}`}
                                    className="btn btn-outline-secondary nav-item nav-link"
                                >
                                    Editar
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
