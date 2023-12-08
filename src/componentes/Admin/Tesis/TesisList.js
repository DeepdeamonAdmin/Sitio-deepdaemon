import React from 'react'
import TesisCard from './TesisCard';
import {db} from '../../../firebase/firebase-config';
import {
	getAuth,
} from 'firebase/auth';
import { useSelector } from 'react-redux';

const TesisList = () => {

    const auth = getAuth();
    const dN = auth.currentUser.displayName;

    const { tesis } = useSelector(state => state.tesis);
    console.log(tesis)
    
    return (
        <>
            <div className='row'>
                <div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap justify-content-between" style={{gap:"5px"}}>
                    {
                        tesis.map(item => (
                            <TesisCard
                                key={item.id}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TesisList
