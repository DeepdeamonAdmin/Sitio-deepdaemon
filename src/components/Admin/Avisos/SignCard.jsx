//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso de Firestore
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

//Uso de Swal para las alertas
import Swal from 'sweetalert2';

//Componentes necesario
import { startLoadingAvisos } from '../../../actions/avisos';

const SignCard = (item) => {
  //Delcaración del dispatch
  const dispatch = useDispatch();

  //Función para eliminar un aviso
  const deleteAviso = async (id) => {
    const avisoDoc = doc(db, 'Avisos', id);
    await deleteDoc(avisoDoc);
    Swal.fire('Aviso eliminado', 'Éxito');

    //Envio al estado la petición de carga de los avisos
    dispatch(startLoadingAvisos());
  };

  //Despliegue de la tarjeta del aviso
  return (
    <div
      className="card animate__animated animate__fadeIn"
      style={{ maxWidth: 450, height: 150, minWidth: 350 }}
    >
      <div className="row no-gutters">
        <div className="col-4 d-flex align-items-stretch">
          <img
            src={item.photo}
            className="card-img d-inline-flex p-2"
            alt="..."
            style={{
              marginLeft: '10%',
              width: '150px',
              height: '150px',
              borderRadius: '7%',
            }}
          />
        </div>
        <div className="col-8 d-flex flex-column">
          <div className="card-body p-1 mr-2" style={{ maxHeight: 90 }}>
            <h5 className="card-title ml-2 mt-1" style={{ height: 35 }}>
              {' '}
              {item.name}{' '}
            </h5>
            <p className="card-text"> {item.desc} </p>
          </div>
          <div
            className="card-body d-grid gap-2 d-md-flex justify-content-md-end mr-2"
            style={{ paddingTop: '0px' }}
          >
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                deleteAviso(item.id);
              }}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignCard;
