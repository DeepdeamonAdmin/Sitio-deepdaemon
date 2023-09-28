import React from 'react'
import {getAuth} from 'firebase/auth';
import { useSelector } from 'react-redux';
import PublicacionesCard from './PublicacionesCard';

const PublicacionesList = () => {
    //const auth = getAuth();
    //const dN = auth.currentUser.displayName;
    const  publications  = useSelector(state => state.publications);
    
    
    //console.log(publications);
    return (
        <>
            <div className="card-columns animate__animated animate__fadeIn px-5">
                {
                   publications.publications.map( item=> (
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
