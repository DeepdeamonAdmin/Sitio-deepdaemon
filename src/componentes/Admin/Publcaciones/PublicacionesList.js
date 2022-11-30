import React from 'react'
import {getAuth} from 'firebase/auth';
import { useSelector } from 'react-redux';
import PublicacionesCard from './PublicacionesCard';

const PublicacionesList = () => {

    const auth = getAuth();
    const dN = auth.currentUser.displayName;

    const { publicaciones } = useSelector(state => state.publications);
    console.log(publicaciones)

    
    return (
        <>
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    publicaciones.map(item => (
                        <PublicacionesCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default PublicacionesList
