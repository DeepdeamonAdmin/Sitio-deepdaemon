import Swal from 'sweetalert2';
import { 
    getAuth,
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
} from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/firebase-config";
import { googleAuthProvider } from '../firebase/firebase-config';

import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';


//Registrar usuario por correo
export const startRegisterWithEmailPassword = ( formValues ) => {
    return ( dispatch ) => {

    const auth = getAuth();

        createUserWithEmailAndPassword(auth, formValues.email, formValues.password )
        .then( async({ user }) => {
            await updateProfile( user, {displayName: formValues.name } );

            completarDatos( user.uid, formValues);

            dispatch(
                login( user.uid, user.displayName )
            );
        })
        .catch( e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        })

    }
}


const completarDatos = async(uid, formvalues) =>{
    //agregamos los datos en fireStore
    await setDoc(doc(db, 'Usuarios', uid ), {
        "rol": 'other',
        "nombre": formvalues.name,
        "email": formvalues.email,
        "password": formvalues.password,
        "password2": formvalues.password2,
        "fechaNac":'',
        'urlImg':'',
        'grado':'',
        "descripcion":'',
        "school":'',
        "unidad":'',
        "titulo":'',
        "linkedin":'',
        "facebook":'',
        "Github":'',
    })
    console.log('Se agrego la bd');
 
}

export const registroDesdeLider = async(formValues) =>{
    return ( dispatch ) => {

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, formValues.email, formValues.password )
        .then( async({ user }) => {
            await updateProfile( user, {displayName: formValues.name } );
            completarDatosDesdeForm( user.uid, formValues);

            dispatch(
                login( user.uid, user.displayName )
            );
        })
        .catch( e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        })

    }
}

const completarDatosDesdeForm = async(uid, formValues) =>{
    //agregamos los datos en fireStore
    await setDoc(doc(db, 'Usuarios', uid ), {
        "rol": 'other',
        "nombre": formValues.name,
        "email": formValues.email,
        "password": formValues.password,
        "password2": formValues.password2,
        "fechaNac":'',
        'urlImg':'',
        'grado':'',
        "descripcion":'',
        "school":'',
        "unidad":'',
        "titulo":'',
        "linkedin":'',
        "facebook":'',
        "Github":'',
    })
    console.log('Se agrego la bd');
 
}

const completarDatosGoogle = async(uid, name, email) =>{
     //Obtenemos el rol de la base si existe
     const docRef = doc(db, 'Usuarios', uid );
     const docSnap = await getDoc(docRef);
     const data = docSnap.data();
     
     if (docSnap.exists()) {
        //agregamos los datos en fireStore
            if ( data.rol === 'administrador' ){   
                await updateDoc(doc(db, 'Usuarios', uid ), {
                    "nombre": name,
                    "email": email
                    })
            } else{

                    await setDoc(doc(db, 'Usuarios', uid ), {
                        "rol": 'other',
                        "nombre": name,
                        "email": email, 
                        "password":'',
                        "password2":'',
                        "fechaNac":'',
                        'urlImg':'',
                        'grado':'',
                        "descripcion":'',
                        "school":'',
                        "unidad":'',
                        "titulo":'',
                        "linkedin":'',
                        "facebook":'',
                        "Github":'',
                    })
                    console.log('Se agrego la bd'); 
                    }
                }
                        
}



export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        const auth = getAuth(); 
        dispatch( startLoading() );
                
        signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
               
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })   
        
    }
}


//accion para acceder por google
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                completarDatosGoogle( user.uid, user.displayName, user.email );
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    const auth = getAuth();
    return async( dispatch ) => {
        await signOut(auth);
        
        dispatch( logout() );
    }
}


export const logout = () => ({
    type: types.logout
})


