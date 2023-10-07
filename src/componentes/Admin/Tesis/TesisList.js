import React from 'react'
import TesisCard from './TesisCard';
import {db} from '../../../firebase/firebase-config';
import {
	getAuth,
} from 'firebase/auth';
import { useSelector } from 'react-redux';

const TesisList = () => {

    //const dispatch = useDispatch();

    //const { projects } = useSelector( state => state.projects );
    
    //const { data:project, loading } = useGet(getProject);

    const auth = getAuth();
    const dN = auth.currentUser.displayName;

    const { tesis } = useSelector(state => state.tesis);
    console.log(tesis)
    
    return (
        <>
            {/* { loading && <p className="animate__animated animate__flash">Loading</p> } */}
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    tesis.map(item => (
                        <TesisCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default TesisList
