//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Uso de Firestore
import { getAuth } from 'firebase/auth';

//Componentes necesarios
import TesisCardUser from './TesisCardUser';

const TesisListUser = () => {
  //Obtención de la autenticación del usuario
  const auth = getAuth();

  // Esta variable es para saber quién es el usuario actual
  const currentUser = auth.currentUser.displayName;

  //Obtención de las tesis del estado
  const { tesis } = useSelector((state) => state.tesis);

  /* * La comprobación se hace porque en el objeto tesis hay una propiedad llamada 'alumnosLista',
   * * esa propiedad es un arreglo de strings pero en caso de que alguna tesis no tenga alumnosLista
   * * el valor por defecto de esa propiedad será 'Sin autores', es decir, un string, no un arreglo,
   * * por lo que al momento de iterar las tesis debemos comprobar de que sean un arreglo, ya que el
   * * método some solo es para arreglos y si no hicieramos esa comprobación daría un error*/

  // Esta variable es para obtener solo las tesis que son del usuario
  const tesisDelUsuario = tesis.filter((tesis) => {
    // Leer comentario de arriba para entender esta comprobación
    if (!Array.isArray(tesis.alumnosLista)) {
      return tesis.alumnosLista === currentUser;
    }
    return tesis.alumnosLista.some((autor) => autor === currentUser);
  });

  //Despliegue de las tesis del usuario
  return (
    <>
      <div className="card-columns animate__animated animate__fadeIn">
        {
          //Aquí iteramos solo las tesis del usuario en lugar de todas las tesis
          tesisDelUsuario.map((item) => (
            <TesisCardUser key={item.id} {...item} />
          ))
        }
      </div>
    </>
  );
};

export default TesisListUser;
