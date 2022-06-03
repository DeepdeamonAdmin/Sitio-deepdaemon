import React from 'react'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { LiderCard } from './LiderCard';

export const LiderList = () => {
    const { data:member, loading } = useGet(getMember);
    
    
    return (
        <>
            { loading && <p className="animate__animated animate__flash">Loading</p> }
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    member.map(item => (

                        //Verificar si status es igual a "leader"
                        item.status === "leader" && (
                            <LiderCard 
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
