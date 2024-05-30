//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import PublicacionesCard from './PublicacionesCard';

const PublicacionesList = () => {
  //useEffect para cargar las publicaciones
  React.useEffect(() => {}, []);

  //Obtención de las publicaciones del estado
  var publications = useSelector((state) => state.publications);

  //Separar las publicaciones y ordenarlas de acuerdo con su fecha
  var publications_type = publications.publications
    .slice()
    .sort(compararFechas);

  //Función para verificar si cuenta con una fecha válida
  function esFechaInvalida(fechaString) {
    const fecha = new Date(fechaString);
    return isNaN(fecha) || fecha.toString() === 'Invalid Date';
  }

  //Función para comparar las fechas de las publicaciones
  function compararFechas(a, b) {
    if (esFechaInvalida(a.yearMonth)) {
      return 1; // a es inválida, va después de b
    }
    if (esFechaInvalida(b.yearMonth)) {
      return -1; // b es inválida, va después de a
    }
    return new Date(b.yearMonth) - new Date(a.yearMonth); // Ordenar fechas válidas
  }

  //Despliegue de las tarjetas de las publicaciones
  return (
    <>
      <div className="card-columns d-flex animate__animated animate__fadeIn">
        <div className="d-flex flex-wrap justify-content-center">
          {publications_type.map((item) => (
            <PublicacionesCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicacionesList;
