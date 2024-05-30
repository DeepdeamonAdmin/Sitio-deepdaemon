//Uso de Firestore
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, app2 } from '../firebase/firebase-config';
import { googleAuthProvider } from '../firebase/firebase-config';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Componentes necesarios
import { types } from '../types/types';
import { startLoading, finishLoading, uiCloseModal } from './ui';
import { startLoadingUsers } from './user';

//Registrar usuario por correo
export const startRegisterWithEmailPassword = (formValues) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: formValues.name });
        completarDatos(user.uid, formValues);
        validar(auth);

        //Envio al estado el cierre del modal
        dispatch(uiCloseModal());
      })
      .catch((e) => {
        console.log(e);
        Swal.fire('Error', e.message, 'error');
      });
  };
};

//Funcion que envia un correo electronico para validar la cuenta.
function validar(auth) {
  sendEmailVerification(auth.currentUser).then(() => {});
}

//Función para completar los datos del usuario
const completarDatos = async (uid, formValues) => {
  await setDoc(doc(db, 'Usuarios', uid), {
    rol: formValues.rol,
    nombre: formValues.name,
    email: formValues.email,
    password: formValues.password,
    urlImg:
      'https://firebasestorage.googleapis.com/v0/b/deepdaemon-bf419.appspot.com/o/Gallery%2FAlumno%2FUser_Default.jpg?alt=media&token=ad597d38-45dc-4495-bdd3-0816f91e88e7',
    display: 'Y',
    grado: 'current',
    descripcion: '',
    idSchool: 'vacio',
    idCareer: 'vacio',
    nivel: 'vacio',
    esAutor: 'Y',
    idWork: 'student',
    linkedin: '',
    facebook: '',
    github: '',
  });
};

//Función para el registro de un usuario del tipo lider
export const registroDesdeLider = (formValues) => {
  const auth = getAuth();
  return (dispatch) => {
    const auth2 = getAuth(app2);
    createUserWithEmailAndPassword(auth2, formValues.email, formValues.password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: formValues.name }).then(
          auth2.signOut(),
        );
        completarDatosDesdeForm(user.uid, formValues);

        //envio al estado del cierre del modal
        dispatch(uiCloseModal());
        Swal.fire('Alumno agregado con éxito');

        //Cargar usuarios al estado
        dispatch(startLoadingUsers());
      })
      .catch((e) => {
        console.log(e);
        Swal.fire('Error', e.message, 'error');
      });
    console.log(auth.currentUser.displayName);
  };
};

//Función para completar los datos desde el formualrio
const completarDatosDesdeForm = async (uid, formValues) => {
  await setDoc(doc(db, 'Usuarios', uid), {
    rol: formValues.rol,
    nombre: formValues.nombre,
    email: formValues.email,
    password: formValues.password,
    urlImg:
      formValues.urlImg ||
      'https://firebasestorage.googleapis.com/v0/b/deepdaemon-bf419.appspot.com/o/Gallery%2FAlumno%2FUser_Default.jpg?alt=media&token=ad597d38-45dc-4495-bdd3-0816f91e88e7',
    display: formValues.display,
    grado: formValues.grado,
    descripcion: formValues.descripcion,
    idSchool: formValues.idSchool,
    idCareer: formValues.idCareer,
    nivel: formValues.nivel,
    esAutor: formValues.esAutor,
    idWork: formValues.idWork,
    linkedin: formValues.linkedin,
    facebook: formValues.facebook,
    github: formValues.github,
  });
};

//Función para registrar un usuario del tipo lider
export const registrarLider = (formValues) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: formValues.name });
        completarDatosDeLider(user.uid, formValues);

        Swal.fire('Usuario líder registrado', 'Éxito');
        //Envio al estado el cierre del modal
        dispatch(uiCloseModal());

        //Cargar usuarios al estado
        dispatch(startLoadingUsers());
      })
      .catch((e) => {
        console.log(e);
        Swal.fire('Error', e.message, 'error');
      });
  };
};

//Función para completar los datos del lider
const completarDatosDeLider = async (uid, formValues) => {
  await setDoc(doc(db, 'Usuarios', uid), {
    rol: 'administrador',
    nombre: formValues.name,
    email: formValues.email,
    password: formValues.password,
    urlImg:
      formValues.urlImg ||
      'https://firebasestorage.googleapis.com/v0/b/deepdaemon-bf419.appspot.com/o/oQKZ628qIJS3YIlV2VjZHW6ZSXQ2%2FfotoPerfilUsuario.jpg?alt=media&token=baf1bfc7-944d-4683-a998-8b730fa9c891',
    grado: 'leader',
    display: formValues.display,
    esAutor: formValues.esAutor,
    idWork: formValues.idWork,
    descripcion: '',
    school: '',
    titulo: '',
    linkedin: '',
    facebook: '',
    Github: '',
  });
};

//Función para completar los datos de Google
const completarDatosGoogle = async (uid, name, email) => {
  const docRef = doc(db, 'Usuarios', uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (docSnap.exists()) {
    if (data.rol === 'administrador') {
      await updateDoc(doc(db, 'Usuarios', uid), {
        nombre: name,
        email: email,
      });
    } else {
      await setDoc(doc(db, 'Usuarios', uid), {
        rol: 'other',
        nombre: name,
        email: email,
        password: '',
        password2: '',
        fechaNac: '',
        urlImg: '',
        display: 'Y',
        grado: '',
        descripcion: '',
        school: '',
        unidad: '',
        titulo: '',
        linkedin: '',
        facebook: '',
        Github: '',
      });
    }
  }
};

//Función para iniciar sesión con correo y contraseña
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    const auth = getAuth();

    //Envio al estado el inicio de carga
    dispatch(startLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        //Envio al estado el inicio de sesión
        dispatch(login(user.uid, user.displayName));

        //Envio al estado la finalización de carga
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);

        //Envio al estado la finalización de carga
        dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error');
      });
  };
};

//función para acceder por Google
export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      completarDatosGoogle(user.uid, user.displayName, user.email);

      //Enviar al estado el inicio de sesión
      dispatch(login(user.uid, user.displayName));
    });
  };
};

//Publicar en el estado el inicio de sesión
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

//Función para iniciar el cierre de sesión
export const startLogout = () => {
  const auth = getAuth();
  return async (dispatch) => {
    await signOut(auth);

    //Envio al estado el cierre de sesión
    dispatch(logout());
  };
};

//Publicación en el estado el cierre de sesión
export const logout = () => ({
  type: types.logout,
});
