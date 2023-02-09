
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({isAuthenticade, children, rol}) => {
  if(isAuthenticade && rol === undefined ){
    return <Navigate to='/' replace />
  }else if (isAuthenticade && rol === 'administrador') {
      return <Navigate to="/admin" replace />;
    }else if(isAuthenticade && rol === 'alumno' ){
      return <Navigate to="/user" replace />;
    }else if(isAuthenticade && rol === 'externo' ){
      return <Navigate to="/externo" replace />;
    }
  return children;
};


PublicRoute.propTypes = {
    isAuthenticade: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}