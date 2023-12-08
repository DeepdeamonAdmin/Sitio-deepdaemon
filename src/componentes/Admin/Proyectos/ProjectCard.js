import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteProjectGeneral, deleteProjectAdmin } from '../../../actions/delete';
import { startLoadingProject } from '../../../actions/projects';

const ProjectCard = (item) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
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
                //dispatch( deleteProjectAdmin(item.name) );
                dispatch(deleteProjectGeneral(item.id));
                dispatch(startLoadingProject())
                //navigate('/admin/projects');
            }
        })
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 700 }}>
            <div className="row no-gutters">
                <div className="col-md-12 mb-3">
                    <div className="card-body row align-items-center">
                        <div className="col-md-3">
                            <img
                                className="img-fluid"
                                src={item.urlImg}
                                alt="proyect"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    objectfit: "scale-down"
                                    
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-title"> {item.name} </h5>
                            <p className="card-text"> {item.descr} </p>
                        </div>
                        <div className="col-md-3 text-right">
                            <p>
                                <Link
                                    to={`/admin/projects/${item.id}/${item}`}
                                    className="btn btn-primary btn-md">
                                    Editar
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
