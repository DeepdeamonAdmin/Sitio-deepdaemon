import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
//uso de rutas e
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

//proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { getUserRolUid, startLoadingUsers } from '../actions/user';
import { login } from '../actions/auth';
import { startLoadingProject } from '../actions/projects';
import { MobileDashBoardSinAuth } from './MobileDashBoardSinAuth';
import { MobileDashBoardAuth } from './MobileDashBoardAuth';





export const AppRouterMobile = () => {

    const dispatch = useDispatch();
    const auth = getAuth();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { rol } = useSelector(state => state.user);

    function validar() {

        sendEmailVerification(auth.currentUser)

            .then(() => {

            });
    }
    const refresh = () => window.location.reload(true)

    useEffect(() => {

        dispatch(startLoadingUsers());
        dispatch(startLoadingProject());

        onAuthStateChanged(auth, (user) => {

                if ( (user?.uid)) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(getUserRolUid());
                dispatch(startLoadingProject());

                if (user.emailVerified) {
                    console.log("Verificado")
                } else {
                    console.log("No verificado Mobile")
                }


            } else {
                setIsLoggedIn(false);
                console.log("Verificar usuario")
            }

            setChecking(false);

        });

    }, [dispatch, auth, setChecking, setIsLoggedIn])


    if (checking) {
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
                        <PublicRoute isAuthenticade={isLoggedIn} rol={rol} >
                            <MobileDashBoardSinAuth />
                        </PublicRoute>
                    }
                />
                <Route
                    path="Admin/*"
                    element={
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'administrador'}>
                            <MobileDashBoardAuth />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="user/*"
                    element={
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'alumno'}>
                            <MobileDashBoardAuth />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="externo/*"
                    element={
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'externo'}>
                            <MobileDashBoardAuth />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}
