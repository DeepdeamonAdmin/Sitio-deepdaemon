
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({isAuthenticade, children, rol}) => {
    
    if (isAuthenticade && rol !== 'i9feCRbgSiYTYHfGrRagJvcAHR73') {
        return <Navigate to="/admin" replace />;
      }else if(isAuthenticade && rol !== 'i9feCRbgSiYTYHfGrRagJvcAHR73' ){
        return <Navigate to="/" replace />;
      }
    return children;
};


PublicRoute.propTypes = {
    isAuthenticade: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}