import React from 'react'
import { useGet } from '../../../hooks/useGet'
import { getMember } from '../../../selectors/get/getMember';
import { MemberCard } from './MemberCard';

export const MemberList = () => {
    const { data:member, loading } = useGet(getMember);
    
    
    return (
        <>
            { loading && <p className="animate__animated animate__flash">Loading</p> }
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    member.map(item => (
                        <MemberCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}
