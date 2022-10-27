import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//import { deleteProject } from '../../../actions/delete';
import { db } from '../../firebase/firebase-config'
import { collection, getDocs, where, get, query } from "firebase/firestore";
import {
    getAuth,
} from 'firebase/auth';

const ProjectCard = (item) => {

    const dispatch = useDispatch();

    /*const handleAddProject = (e) => {
        e.preventDefault();
        dispatch( deleteProject(item.id) );
    }*/

    const handleAddProject = () => {
        /*try {
            const nameProject = item.name;
            console.log(nameProject);
            const ref = collection(db, "Proyectos")
            const q = query(ref, where("name", "==", nameProject))
            //const Data = getDocs(q);
            console.log(q)
            //setProjects(arrayData)
            const querySnapshot = getDocs(q);
            const arrayData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            console.log(arrayData)
            /*querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
            });

        } catch (error) {
            console.log(error)
        }*/
    }

    /*const [project, setProject] = React.useState([])
    React.useEffect(() => {
        const addProject = async () => {
            try {
                const nameProject = this.name;
                const ref = collection(db, "Proyectos")
                const q = query(ref, where("publisher", "==", dN))
                const Data = await getDocs(q);
                const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setProject(arrayData)
            	
            } catch (error) {
                console.log(error)
            }
        }
        addProject()
    }, [])*/

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={`../../../../media/proyectos/project.png`}
                        alt="project"
                        className="card-img"
                    />
                </div>
                <div className="col-md-5">
                    <div className="card-body">
                        <h5 className="card-title"> {item.name} </h5>
                        <p className="card-text"> {item.descr} </p>
                    </div>
                </div>
                <div className="col-md-1">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm" name={item.name} onClick={handleAddProject}>Agregar</button>
                </div>

            </div>
        </div>
    )
}

export default ProjectCard
