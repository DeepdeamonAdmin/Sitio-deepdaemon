//Uso de PropTypes para validación de información pasada en las props
import PropTypes from 'prop-types';

//Uso de Navigate para movimiento entre rutas
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticade, children, rol }) => {
  //Verificación, si no está autenticado, regresar a la página default, si si lo está, checar tipo de usuario
  if (isAuthenticade && rol === undefined) {
    return <Navigate to="/" replace />;
  } else if (isAuthenticade && rol === 'administrador') {
    return <Navigate to="/admin" replace />;
  } else if (isAuthenticade && rol === 'alumno') {
    return <Navigate to="/alumno" replace />;
  } else if (isAuthenticade && rol === 'externo') {
    return <Navigate to="/externo" replace />;
  }
  return children;
};

//Definición de las props necesarias
PublicRoute.propTypes = {
  isAuthenticade: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
