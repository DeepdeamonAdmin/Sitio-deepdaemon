import Swal from 'sweetalert2';
import { 
    getAuth,
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
} from 'firebase/auth';

import { doc, setDoc, getDoc  } from "firebase/firestore";

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
    await setDoc(doc(db, uid, 'Datos' ), {
        "gradoColaborador": 'Other',
        "nombre": formvalues.name,
        "email": formvalues.email,
        "password": formvalues.password,
        "password2": formvalues.password2,
    })
    console.log('Se agrego la bd');
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


export const getRolUid = () => {
    return async(dispatch, getState ) => {
        
        //obtenermos el uid 
        const { uid } = getState().auth;

        const docRef = doc(db, uid, "Datos");
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        

        //verificamos que obtenimos el documento 
        if (docSnap.exists()) {
            //mandamos el rol junto el uid a nuestro redux
            dispatch(
                getUserRol( data.gradoColaborador )
            );
        } else {
            // doc.data() will be undefined in this case
                //getUserRol('Other')
            Swal.fire('Error gradoColabarador no identificado');
        }
    }
}

//obtener datos usuario actual en redux
const getUserRol = (gradoColaborador) =>(
    {
        type:types.accesoRol,
        payload:{
            gradoColaborador,
        }
    }
) 
