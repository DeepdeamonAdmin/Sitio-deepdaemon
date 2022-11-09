import React from 'react';
import './users.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProjectUser } from '../../actions/delete';
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";

export const Projects = () => {

    const dispatch = useDispatch();

    const { projects } = useSelector( state => state.projects );
    console.log(projects);
    let mostrador = 0;

    const [projectsRef, setProjects] = React.useState([])
	React.useEffect(() => {
        projects.map( project =>{
		const getProjects = async () => {
			try {
                const ref = collection(db, "Proyectos");
				const q = query(ref, where("name", "==", project.name));
                console.log(q);
                const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({id: project.id, ...doc.data()}))
				setProjects(arrayData);
                
			} catch (error) {
				console.log(error)
			}
		}
		getProjects()
    })
	}, [])
    const handleDelete = (id) => {
        //Imprimir el id
        console.log(id);
        dispatch(deleteProjectUser(id));
    }

    const handleVermas = (id) => {
        //console.log(id);
        if(mostrador === 0){
            //Poner visible el div con el id del proyecto
            document.getElementById(id).style.display = 'block';
            //Cambiar texto del boton
            document.getElementById(id+"btn").innerHTML = 'Ver menos';
            mostrador = 1;
        }else{
            //Poner invisible el div con el id del proyecto
            document.getElementById(id).style.display = 'none';
            //Cambiar texto del boton
            document.getElementById(id+"btn").innerHTML = 'Ver más';
            mostrador = 0;
        }
        
    }

    return (
    <div className='container'>
        <div className='center-project'>
            <table className='tb-project'>
                <tr className='th-project'>
                    <td className='td-project'>
                        Imagen
                    </td>
                    <td className='td-project'>
                        Nombre
                    </td>
                    <td className='td-project'>
                        Nombre Técnologia
                    </td>
                    <td className='td-project'>
                        Enlace
                    </td>
                    <td colSpan={2} className='td-project'>
                        <Link
                            to ='/user/addproject'
                            className="btn btn-outline-secondary nav-item nav-link"
                        >
                            Agregar Proyecto
                        </Link>
                    </td>
                </tr>
                {
                    projectsRef.map( project =>(
                        <tr key={project.id} >
                            <td className='td-project'>
                                <img 
                                    src={ project.urlImg } 
                                    className='foto-project'
                                    alt="foto-perfil" />
                            </td>
                            <td className='td-project'>
                                {project.name}
                            </td>
                            <td className='td-project'>
                                {project.nameTech}
                            </td>
                            <td className='td-project'>
                                {project.url}
                            </td>
                            <td className='td-project'>
                                <button 
                                    className='btn-project-delete'
                                    onClick={ () => handleDelete(project.id) }
                                // onClick={ console.log('hola'); } 
                                >
                                    Eliminar
                                </button>   
                            </td>
                            <td className='td-project'>

                                {/*
                                <button 
                                    //id del proyecto concatenado con el nombre del proyecto
                                    id={project.id + "btn"}
                                    className="btn btn-outline-secondary nav-item nav-link" 
                                    onClick={ () => handleVermas(project.id) }>
                                    Ver más
                                </button>
                                */}
                                
                                <Link
                                    to ={`/user/moreproject/${project.id}`}
                                    //to ={`/user/moreproject:${project.id}`}
                                    className="btn btn-outline-secondary nav-item nav-link"
                                >
                                    Ver más
                                </Link>
                                
                                <div id={project.id} style={{display: 'none'}}>
                                    <div className='div-project'>
                                        <div className='div-project-img'>
                                            <img src={ project.urlImg }
                                                className='foto-project'
                                                alt="foto-perfil" />
                                        </div>
                                        <div className='div-project-info' witdh="100px">
                                            <label className='label-project'>Nombre: {project.name}</label>
                                            <br></br>
                                            <label className='label-project'>Tecnología: {project.nameTech}</label>
                                            <br></br>
                                            <label className='label-project'>Enlace: {project.url}</label>
                                            <br></br>
                                            <label className='label-project'>Descripción: {project.descripcion}</label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))       
                }
            </table>
        </div>

    </div>
)
}
