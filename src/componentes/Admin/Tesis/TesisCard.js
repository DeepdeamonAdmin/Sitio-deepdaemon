import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deleteTesisUser } from '../../../../src/actions/delete';
import { useNavigate } from 'react-router-dom';
import { startLoadingTesis } from '../../../actions/tesis';

const TesisCardUser = (item) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = useParams();
    /*const handleAddProject = (e) => {
        e.preventDefault();
        dispatch( deleteProject(item.id) );
    }*/

    const handleDelete = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta tesis?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(item.id)
                dispatch(deleteTesisUser(item));
                dispatch(startLoadingTesis())
                //navigate('/admin/tesis');
            }
        })
    }

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 700 }}>
            <div className="row no-gutters">
                <div className="col-3 mt-2 ml-2 mr-2 mb-2">
                    <img
                        src={item.urlImg}
                        alt="project"
                        className="card-img"
                        style={{
                            marginLeft : '10px',
                            width : '150px',
                            height : '150px',
                            borderRadius : "7%"
                        }}
                    />
                </div>
                <div className="col-6 ml-0 mr-0">
                    <div className="card-body">
                        <h5 className="card-title"> {item.name} </h5>
                        <p className="card-text"> {item.descr} </p>
                    </div>
                </div>
                <div className="col-2 mr-0 ml-4">
                    <p>
                        <Link
                            to={`/admin/tesis/${item.id}/${item}`}
                            className="btn btn-primary btn-sm">
                            Editar
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default TesisCardUser
