import React from 'react'
//import { useGet } from '../../../hooks/useGet'
//import { getProject } from '../../../selectors/get/getProject';
import TesisCardUser from './TesisCardUser'
//import { useSelector } from 'react-redux';
//import { useDispatch } from 'react-redux';
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import {
	getAuth,
} from 'firebase/auth';
import { useSelector } from 'react-redux';

const TesisListUser = () => {

    //const dispatch = useDispatch();

    //const { projects } = useSelector( state => state.projects );
    
    //const { data:project, loading } = useGet(getProject);
    const auth = getAuth();
    const dN = auth.currentUser.displayName;

    const { tesis } = useSelector(state => state.tesis);
    console.log(tesis)
    // const [projects, setProjects] = React.useState([])
	// React.useEffect(() => {
	// 	const getProjects = async () => {
	// 		try {
    //             const ref = collection(db, "Tesis")
	// 			//const q = query(ref, where("publisher", "==", dN))
    //             //console.log(q)
    //             const Data = await getDocs(ref);
	// 			const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
	// 			setProjects(arrayData)
				
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// 	getProjects()
	// }, [])
    
    return (
        <>
            {/* { loading && <p className="animate__animated animate__flash">Loading</p> } */}
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    tesis.map(item => (
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
