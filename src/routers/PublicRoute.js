
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({isAuthenticade, children, rol}) => {
  if(isAuthenticade && rol === undefined ){
    return <Navigate to='/' replace />
  }else if (isAuthenticade && rol === 'Administrador') {
      return <Navigate to="/admin" replace />;
    }else if(isAuthenticade && rol !== 'Administrador' ){
      return <Navigate to="/user" replace />;
    }
  return children;
};


PublicRoute.propTypes = {
    isAuthenticade: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}