import React, { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config'
//uso de rutas e
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';


import { login } from '../actions/auth';



//rutas para sitio de administración
import { AdminDashBoard } from './AdminDashBoard';

//proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { HomeRoutes } from './HomeRoutes';




export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ role, setRole ] = useState(null);


    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])


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
                        <PublicRoute isAuthenticade = { isLoggedIn } rol= {role} >
                        <HomeRoutes /> 
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="Admin/*"
                    element={ 
                        <ProtectedRoute isAuthenticade={isLoggedIn}>
                            <AdminDashBoard />
                        </ProtectedRoute>
                    } 
                />       
            </Routes>
        </Router>
    )
}
