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
    // Esta variable es para obtener solo las tesis que son del usuario
    const tesisDelUsuario = tesis.filter(tesis => {
        if (!Array.isArray(tesis.autores)) {
            return false;
        }
        return tesis.autores.some(autor => autor.nombreAutor === currentUser);
    })


    return (
        <>
            {/* { loading && <p className="animate__animated animate__flash">Loading</p> } */}

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
