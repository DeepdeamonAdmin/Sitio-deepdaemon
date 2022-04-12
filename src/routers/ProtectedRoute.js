import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({isAuthenticade, children}) => {
    
    if (!isAuthenticade) {
        return <Navigate to="/login" replace />;
      }
    return children;
};


ProtectedRoute.propTypes = {
    isAuthenticade: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}
