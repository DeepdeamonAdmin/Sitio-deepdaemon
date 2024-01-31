//Uso de Firestore
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase-config";

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Función para eliminar un usuario externo
export const deleteUserExt = (item) => {
    return async () => {
        const deleteUsrExt = await deleteDoc(doc(db, "Usuarios", item.id));
        if (!deleteUsrExt) {
            Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
            })
        } else {
            Swal.fire('Error al eliminar usuario');
        }
    }
}