//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Uso de Firestore
import { auth } from '../../firebase/firebase-config';

//Componentes necesarios
import { VerMasPublication } from '../ui/VerMasPublication';
import { ModalCrearCuenta } from './ModalCrearCuenta';

export const PublicationScreen = ({ type }) => {
  //Obtención del usuario
  const user = auth.currentUser;

  //Obtención de las publicaciones del estado
  const publications = useSelector((state) => state.publications);

  //Filtrar por tipo de publicación solicitado
  var publications_type = publications.publications.filter(
    (publication) =>
      type.includes(publication.postType) && publication.display === 'Yes',
  );

  //Dividir y ordenar de acuerdo a sus fechas
  publications_type = publications_type.slice().sort(compararFechas);

  //Función para verificar si cuenat con una fecha válida
  function esFechaInvalida(fechaString) {
    const fecha = new Date(fechaString);
    return isNaN(fecha) || fecha.toString() === 'Invalid Date';
  }

  //Función para comparar las fechas
  function compararFechas(a, b) {
    if (esFechaInvalida(a.yearMonth)) {
      return 1; // a es inválida, va después de b
    }
    if (esFechaInvalida(b.yearMonth)) {
      return -1; // b es inválida, va después de a
    }
    return new Date(b.yearMonth) - new Date(a.yearMonth); // Ordenar fechas válidas
  }

  //Verificación si existen publicaciones
  if (publications.length === 0) {
    return (
      <p className="team_title">
        No hay publicaciones disponibles por el momento.
      </p>
    );
  }

  //DEspliegue de las tarjetas de publicaciones
  return (
    <>
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-center ml-1">
          {publications_type.map((publication) => {
            return (
              publication.display === 'Yes' && (
                <div
                  className="col-4 d-flex"
                  key={publication.id}
                  style={{
                    minWidth: '350px',
                    flexWrap: 'wrap',
                    paddingRight: 0,
                    paddingLeft: '10px',
                  }}
                >
                  <div
                    className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3"
                    style={{ height: 170, width: '100%', position: 'relative' }}
                  >
                    <div
                      className="row justify-content-left d-flex"
                      style={{ width: '100%' }}
                    >
                      <div className="col-4 col-sm-auto col-md-auto col-lg-auto col-xl-auto d-flex align-items-center pr-0">
                        <img
                          className="card-img ml-3 mr-0 pr-0"
                          src={publication.urlImg}
                          style={{
                            objectPosition: 'center',
                            height: '110px',
                            width: '110px',
                            borderRadius: '5px',
                          }}
                          alt="member"
                        />
                      </div>
                      <div className="col pl-0 mt-2">
                        <div
                          className="card-body"
                          style={{ position: 'relative' }}
                        >
                          <h6
                            className="card-title"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 5,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxHeight: '5.9em',
                            }}
                          >
                            {publication.title}
                          </h6>
                          <div
                            className="text-right d-flex"
                            style={{
                              position: 'absolute',
                              top: '75px',
                              right: '0px',
                              justifyContent: 'right',
                            }}
                          >
                            {!user && <ModalCrearCuenta />}
                            <VerMasPublication publicacion={publication} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
