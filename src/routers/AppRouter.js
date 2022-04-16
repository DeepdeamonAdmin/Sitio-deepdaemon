import React, { useEffect, useState }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//uso de rutas e
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';


import { getRolUid, login } from '../actions/auth';

//rutas para sitio de administración
import { AdminDashBoard } from './AdminDashBoard';

//proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { HomeRoutes } from './HomeRoutes';
import { UserDashBoard } from './UserDashBoard';




export const AppRouter = () => {

    const dispatch = useDispatch();
    const auth = getAuth();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const { gradoColaborador } = useSelector( state => state.rol );

    console.log( gradoColaborador );

    

    useEffect(() => {
        
        onAuthStateChanged(auth, ( user ) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( getRolUid() );
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
                        <PublicRoute isAuthenticade = { isLoggedIn } rol= { gradoColaborador } >
                        <HomeRoutes /> 
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="Admin/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn && gradoColaborador === 'Administrador' }>
                            <AdminDashBoard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="user/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn && gradoColaborador !== 'Administrador' && gradoColaborador !== undefined }>
                            <UserDashBoard />
                        </ProtectedRoute>
                    } 
                />       
            </Routes>
        </Router>
    )
}
