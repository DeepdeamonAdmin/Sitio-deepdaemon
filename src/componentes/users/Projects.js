import React from 'react';
import './users.css'
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProjectUser } from '../../actions/delete';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import {
    getAuth
} from 'firebase/auth';
export const Projects = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { projects } = useSelector(state => state.projects);
    let mostrador = 0;

    const [projectsRef, setProjectsRef] = React.useState([])
    React.useEffect(() => {
        const getProjectsRef = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                const uids = user.uid;
                const ref = collection(db, `Usuarios/${uids}/Projects`);
                const Data = await getDocs(ref);
                const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setProjectsRef(arrayData);

            } catch (error) {
                console.log(error)
            }
        }

        getProjectsRef()
        //})
    }, [])

    var p = [];
    projectsRef.map(project => {
        const aux = projects.filter(pf => {
            return pf.name === project.name
        })
        p.push(aux[0]);
    })



    const handleDelete = (id) => {

        Swal.fire({
            title: '¿Estás seguro de eliminar el proyecto?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProjectUser(id));
            }
          })
    }

    const handleVermas = (id) => {
        if (mostrador === 0) {
            //Poner visible el div con el id del proyecto
            document.getElementById(id).style.display = 'block';
            //Cambiar texto del boton
            document.getElementById(id + "btn").innerHTML = 'Ver menos';
            mostrador = 1;
        } else {
            //Poner invisible el div con el id del proyecto
            document.getElementById(id).style.display = 'none';
            //Cambiar texto del boton
            document.getElementById(id + "btn").innerHTML = 'Ver más';
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
                                to='/user/addproject'
                                className="btn btn-outline-secondary nav-item nav-link"
                            >
                                Agregar Proyecto
                            </Link>
                        </td>
                    </tr>
                    {
                        p.map(project => (
                            <tr key={project.id} >
                                <td className='td-project'>
                                    <img
                                        src={project.urlImg}
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
                                    <a href={project.url} className="card-link" target="blank">{project.name + " Video"}</a>
                                    
                                </td>
                                <td className='td-project'>
                                    <button
                                        className="btn btn-outline-secondary nav-item nav-link"
                                        onClick={() => handleDelete(project.name)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <td className='td-project'>


                                    <Link
                                        to={`/user/moreproject/${project.id}`}
                                        //to ={`/user/moreproject:${project.id}`}
                                        className="btn btn-outline-secondary nav-item nav-link"
                                    >
                                        Ver más
                                    </Link>

                                    <div id={project.id} style={{ display: 'none' }}>
                                        <div className='div-project'>
                                            <div className='div-project-img'>
                                                <img src={project.urlImg}
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
