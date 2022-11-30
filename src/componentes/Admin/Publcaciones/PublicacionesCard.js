import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deletePublicacion} from '../../../../src/actions/delete';
import { useNavigate } from 'react-router-dom';
import { startLoadingPublication } from '../../../actions/publications';

const PublicacionesCard = (item) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = useParams();
  

    const handleDelete = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta publicacion?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(item.id)
                dispatch( deletePublicacion(item) );    
                dispatch(startLoadingPublication());            
                //navigate('/admin/tesis');
            }
          })
    }

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        //src={`../../../../media/proyectos/project.png`}
                        src={item.urlImg}
                        alt="publication"
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
                <p>
                        <Link 
                            to={ `/admin/tesis/${item.id }/${item}` }
                            className ="btn btn-primary btn-sm">
                                Edit
                        </Link>
                    </p>
                    
                    <p>
                        <button 
                            type="button" 
                            className="btn btn-success btn-sm"
                            onClick={ handleDelete }
                            >
                                Delete</button>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default PublicacionesCard
