//Uso de React
import React from 'react';

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso de Swal para alertar sobre las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { deleteUserExt } from '../../../actions/delete';
import { startLoadingUsers } from '../../../actions/user';

export const ExternoCard = (item) => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Función para eliminar un usuario externo
  const handleDelete = (e) => {
    e.preventDefault();

    //Alerta de eliminación de un usuario externo
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      //En caso de aceptarse la eliminación
      if (result.isConfirmed) {
        //Enviar al estado la eliminación del usuario
        dispatch(deleteUserExt(item));

        //Cargar de nuevo los usuarios
        dispatch(startLoadingUsers());
      }
    });
  };

  //Despliegue de las tarjetas de los externos
  return (
    <div
      className="card ms-3 animate__animated animate__fadeIn"
      style={{ maxWidth: 450 }}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={item.urlImg}
            className="card-img"
            alt="..."
            style={{
              marginLeft: '15px',
              height: '150px',
              width: '150px',
            }}
          />
        </div>
        <div className="col-md-5">
          <div className="card-body l-0 mr-0">
            <h5 className="card-title"> {item.nombre} </h5>
            <p className="card-text" style={{ fontSize: 15 }}>
              {' '}
              {item.email}{' '}
            </p>
          </div>
        </div>
        <div className="col-md-1">
          <p>
            <Link to={`editar/${item.id}`} className="btn btn-primary">
              Editar
            </Link>
          </p>
          <p>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
