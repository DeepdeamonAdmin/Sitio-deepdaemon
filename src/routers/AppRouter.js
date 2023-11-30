import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
//Uso de rutas
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Rutas para sitio de administración
import { AdminDashBoard } from './AdminDashBoard';
//Proteccion de rutas
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { HomeRoutes } from './HomeRoutes';
import { UserDashBoard } from './UserDashBoard';
import { login } from '../actions/auth';
//Para cargar datos al estado
import { getUserRolUid, startLoadingUsers } from '../actions/user';
import { startLoadingProject } from '../actions/projects';
import { startLoadingTesis } from '../actions/tesis';
import { startLoadingPublication } from '../actions/publications';
import { ExternoDashBoard } from './ExternoDashBoard'
import { startLoadingYoutube } from '../actions/youtube';
import { startLoadingGallery } from '../actions/gallery';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { rol } = useSelector(state => state.user);

    useEffect(() => {

        dispatch(startLoadingUsers());
        dispatch(startLoadingProject());
        dispatch(startLoadingTesis());
        dispatch(startLoadingPublication());
        dispatch(startLoadingYoutube());
        

        onAuthStateChanged(auth, (user) => {
                if ( (user?.uid)) {
                    dispatch(login(user.uid, user.displayName));
                    setIsLoggedIn(true);
                    dispatch(getUserRolUid());
                    dispatch(startLoadingGallery());
                if (user.emailVerified) {
                    //console.log("Verificado")
                } else {
                    //console.log("No verificado")
                }
            } else {
                setIsLoggedIn(false);
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
                            <HomeRoutes />
                        </PublicRoute>
                    }
                />
                <Route
                    path="Admin/*"
                    element={
                        <ProtectedRoute isAuthenticade={isLoggedIn && rol === 'administrador'}>
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
                            <ExternoDashBoard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}
