import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { deleteProject } from '../../../actions/delete';
import { db } from '../../firebase/firebase-config'
//import { collection, getDocs, where, get, query } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import {
    getAuth,
} from 'firebase/auth';
import {AddProjectTesis} from '../../actions/projects'

const ProjectCard = (item) => {

    const dispatch = useDispatch();
    const uid = useParams();
    /*const handleAddProject = (e) => {
        e.preventDefault();
        dispatch( deleteProject(item.id) );
    }*/

    const handleAddProject = () => {
        dispatch(AddProjectTesis(item));
    }

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        //src={`../../../../media/proyectos/project.png`}
                        src={item.urlImg}
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
