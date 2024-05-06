//Uso de React
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//Uso de Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Uso de rutas
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { login } from '../actions/auth';

//Rutas para sitios de los diferentes usuarios
import { MobileDashBoardSinAuth } from './MobileDashBoardSinAuth';
import { MobileDashBoardAuth } from './MobileDashBoardAuth';

//Para cargar datos al estado
import { getUserRolUid, startLoadingUsers } from '../actions/user';
import { startLoadingProject } from '../actions/projects';

export const AppRouterMobile = () => {

    //Declaración de variables y obtención de datos
    const dispatch = useDispatch();
    const auth = getAuth();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { rol } = useSelector(state => state.user);

    useEffect(() => {

        //Cargar usuarios al estado
        dispatch(startLoadingUsers());

        //Cargar proyectos al estado
        dispatch(startLoadingProject());

        //Verficar si ha cambiado el tipo de autenticación
        onAuthStateChanged(auth, (user) => {
            if ( (user?.uid)) {

                //Cargar al estado los datos de identificación de usuario
                dispatch(login(user.uid, user.displayName));

                //Cambiar el estado de logeo a verdadero
                setIsLoggedIn(true);

                //Cargar el rol del usuario al estado
                dispatch(getUserRolUid());
            } else {

                //Cambiar el estado de logeo a falso
                setIsLoggedIn(false);
            }
            //Termino de verificación de la información del usuario
            setChecking(false);
        });
    }, [dispatch, auth, setChecking, setIsLoggedIn])

    //Pantalla de espera
    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    //Despliegue de las rutas (version mobile)
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
                    path="admin/*"
                    element={
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'administrador'}>
                            <MobileDashBoardAuth />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="alumno/*"
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
