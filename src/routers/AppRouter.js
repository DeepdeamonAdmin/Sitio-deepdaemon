import React, { useEffect, useState }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//uso de rutas e
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';

//rutas para sitio de administración
import { AdminDashBoard } from './AdminDashBoard';

//proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { HomeRoutes } from './HomeRoutes';
import { UserDashBoard } from './UserDashBoard';
import { getUserRolUid, startLoadinUsersAll } from '../actions/user';
import { login } from '../actions/auth';
import { startLoadingProject, startLoadinProjectsAll } from '../actions/projects';
import { startLoadingTesis, startLoadinTesisAll } from '../actions/tesis';
import { startLoadingPublication } from '../actions/publications';
import { ExternoDashBoard} from './ExternoDashBoard'





export const AppRouter = () => {

    const dispatch = useDispatch();
    const auth = getAuth();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const { rol } = useSelector( state => state.user );

   
    useEffect(() => {

        dispatch( startLoadinUsersAll() );
        dispatch( startLoadinProjectsAll() );
        dispatch( startLoadinTesisAll() );
        
        onAuthStateChanged(auth, ( user ) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( getUserRolUid() );
                dispatch( startLoadingProject() );
                dispatch( startLoadingPublication() );
                dispatch( startLoadinProjectsAll() );
                dispatch( startLoadingTesis() );
                dispatch( startLoadinTesisAll() );
                

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, auth, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }


     return (
        <Router>
            <Routes>
                <Route 
                    path='/*'
                    element={
                        <PublicRoute isAuthenticade = { isLoggedIn } rol= { rol } >
                        <HomeRoutes /> 
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="Admin/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'administrador' }>
                            <AdminDashBoard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="user/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'alumno'}>
                            <UserDashBoard />
                        </ProtectedRoute>
                    } 
                />       
                <Route 
                    path="externo/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'externo'}>
                            <ExternoDashBoard/>
                        </ProtectedRoute>
                    } 
                />       
            </Routes>
        </Router>
    )
}
