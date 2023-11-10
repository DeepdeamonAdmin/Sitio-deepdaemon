import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deletePublicacion } from '../../../../src/actions/delete';
import { useNavigate } from 'react-router-dom';
import { startLoadingPublication } from '../../../actions/publications';

const PublicacionesCard = (item) => {

    const dispatch = useDispatch();
    //    const navigate = useNavigate();
    //    const uid = useParams();


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
                dispatch(deletePublicacion(item));
                dispatch(startLoadingPublication());
                //navigate('/admin/tesis');
            }
        })
    }

    return (

        <div className="card ms-3" style={{ maxWidth: 540, height: 290 }}>
            <div className="row no-gutters">
                <h6 className="card-title mt-3 text-sm" style={{ textAlign: 'center' }}>{item.title}</h6>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-stretch">
                    <img
                        src={item.urlImg}
                        alt="publish"
                        className="imageleader2"
                    />
                </div>
                <div className='col-md-4'>
                    <div className="card-body">

                    </div>
                </div>
                {/*<div className="col-md-4">
                    <img
                        //src={`../../../../media/proyectos/project.png`}
                        src={item.frontImg}
                        alt="publication"
                        className="card-img"
                    />
                </div>*/}
                <div className="col-md-1">
                    <p>
                        <Link
                            to={`/admin/release/editPub/${item.id}`}
                            className="btn btn-primary btn-sm">
                            Editar
                        </Link>
                    </p>

                    {/* <p>
                        <button
                            type="button"
                            className="btn btn-success btn-md"
                            onClick={handleDelete}
                        >
                            Delete</button>
                    </p> */}
                </div>

            </div>
            <div className="row no-gutters">
                <div className="card-body">

                    <p className="badge bg-primary text-wrap"> {item.autor} </p>
                </div>
            </div>
        </div>
    )
}

export default PublicacionesCard
