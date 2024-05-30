//Uso de PropTypes para validación de información pasada en las props
import PropTypes from 'prop-types';

//Uso de Navigate para movimiento entre rutas
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthenticade, children }) => {
  //Verificación, si no está autenticado, regresar a la página default
  if (!isAuthenticade) {
    return <Navigate to="/" replace />;
  }
  return children;
};

//Definición de las props necesarias
ProtectedRoute.propTypes = {
  isAuthenticade: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
