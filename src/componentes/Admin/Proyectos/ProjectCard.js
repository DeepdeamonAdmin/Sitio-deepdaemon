import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector} from 'react-redux';
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
                dispatch( deleteProjectGeneral(item.id) );
                dispatch(startLoadingProject())
                //navigate('/admin/projects');
            }
          })
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540 } }>
            <div className="row no-gutters">
                <div className="col-md-4"> 
                    <img 
                    src={item.urlImg}
                    alt="project" 
                    className = "card-img"
                    />
                </div>  
                <div className="col-md-5">
                    <div className="card-body">
                        <h5 className="card-title"> {item.name} </h5>
                        <p className="card-text"> {item.descr} </p>
                    </div>               
                </div>
                <div className="col-md-1">
                    <p>
                        <Link 
                            to={ `/admin/projects/${item.id }/${item}` }
                            className ="btn btn-primary btn-sm">
                                Edit
                        </Link>
                    </p>
                    
                    {/* <p>
                        <button 
                            type="button" 
                            className="btn btn-success btn-sm"
                            onClick={ handleDelete }>Delete</button>
                    </p> */}
                </div>
            
            </div>
        </div>
    )
}

export default ProjectCard
