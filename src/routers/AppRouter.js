import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
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
import { ExternoDashBoard } from './ExternoDashBoard'
import { startLoadingYoutube } from '../actions/youtube';





export const AppRouter = () => {

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

        dispatch(startLoadinUsersAll());
        dispatch(startLoadingProject());
        dispatch(startLoadingTesis());
        dispatch(startLoadingPublication());
        dispatch(startLoadingYoutube());

        onAuthStateChanged(auth, (user) => {


            //Validacion para los usuarios verificados para poder entrar.
            //if ((user?.uid) && user.emailVerified) {
                if ( (user?.uid)) {
                dispatch(login(user.uid, user.displayName));
                //console.log(user.displayName)
                setIsLoggedIn(true);
                dispatch(getUserRolUid());
                //dispatch(startLoadingProject());
                
                //dispatch(startLoadinProjectsAll());
                //dispatch(startLoadingTesis());
                //dispatch(startLoadinTesisAll());

                if (user.emailVerified) {
                    console.log("Verificado")
                } else {
                    console.log("No verificado")
                }


            } else {
                setIsLoggedIn(false);
                /*Swal.fire({
                    title: 'Verificar Cuenta',
                    text: "Se enviará un correo de verificación",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Enviar Confirmación'
                }).then((result) => {
                    if (result.isConfirmed) {
                        validar();
                        Swal.fire(
                            'Enviado!',
                            'Se envió el correo de verificación.',
                            'success'
                        )
                    }
                })*/
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
