import React from 'react'
import TesisCardUser from './TesisCardUser'
import {
    getAuth,
} from 'firebase/auth';
import { useSelector } from 'react-redux';

const TesisListUser = () => {

    const auth = getAuth();
    // Esta variable es para saber quién es el usuario actual
    const currentUser = auth.currentUser.displayName;

    const { tesis } = useSelector(state => state.tesis);
    /**
     * * La comprobación se hace porque en el objeto tesis hay una propiedad llamada 'autores',
     * * esa propiedad es un arreglo de strings pero en caso de que alguna tesis no tenga autores
     * * el valor por defecto de esa propiedad será 'Sin autores', es decir, un string, no un arreglo,
     * * por lo que al momento de iterar las tesis debemos comprobar de que sean un arreglo, ya que el
     * * método some solo es para arreglos y si no hicieramos esa comprobación daría un error
    */
    // Esta variable es para obtener solo las tesis que son del usuario
    const tesisDelUsuario = tesis.filter(tesis => {
        if (!Array.isArray(tesis.autores)) { // Leer comentario de arriba para entender esta comprobación
            return false;
        }
        return tesis.autores.some(autor => autor.nombreAutor === currentUser);
    })


    return (
        <>
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    // Aquí iteramos solo las tesis del usuario en lugar de todas las tesis
                    tesisDelUsuario.map(item => (
                        <TesisCardUser
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default TesisListUser
