import React, { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config'
//uso de rutas e
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';


import { login } from '../actions/auth';

//rutas sitio publico
import { DashboardRouters } from './DashboardRouters';

//rutas para sitio de administración
import { AdminDashBoard } from './AdminDashBoard';

//componente para auth
import { Login } from '../componentes/Admin/Login';

//proteccion de rutas
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';




export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);


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
            <div>
                    <Switch>
                        <PublicRoute 
                            exact
                            path="/login" 
                            component={ Login }
                            isAuthenticated={ isLoggedIn }  />
                        <PrivateRoute 
                            path="/Admin"
                            component={ AdminDashBoard }
                            isAuthenticated={ isLoggedIn } />       
                       
                        <PublicRoute 
                            path="/" 
                            component={ DashboardRouters }
                            isAuthenticated={ isLoggedIn } />
                        <Redirect to='/'/>

                    </Switch>
            </div>
        </Router>
    )
}
