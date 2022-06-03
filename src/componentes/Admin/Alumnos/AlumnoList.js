import React from 'react'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { AlumnoCard } from './AlumnoCard';

export const AlumnoList = () => {
    const { data:member, loading } = useGet(getMember);
    
    
    return (
        <>
            { loading && <p className="animate__animated animate__flash">Loading</p> }
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    member.map(item => (
                        item.status === "current" && (
                            <AlumnoCard
                                key={item.id}
                                {...item}
                            />
                        )
                    ))
                }
            </div>
        </>
    )
}
