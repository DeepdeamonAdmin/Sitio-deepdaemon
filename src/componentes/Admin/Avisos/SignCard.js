import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

const SignCard = (item) => {

    const dispatch = useDispatch();

    //Configurar hooks
    const [avisos, setAvisos] = useState([]);
    //Referenciar db de firebase
    const avisosCollection = collection(db, 'Avisos');
    //Función para obtener todos los avisos
    const getAvisos = async () => {
        const datos = await getDocs(avisosCollection);
        //console.log(datos.docs)
        setAvisos(
            datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
        );
    }

    const deleteAviso = async (id) => {
        const avisoDoc = doc(db, 'Avisos', id);
        await deleteDoc(avisoDoc);
        Swal.fire('Imagen eliminada', 'Éxito');
    }

    
    return (
        <div className="card animate__animated animate__fadeIn" style={{ maxWidth: 400, height: 180, minWidth:350 }}>
            <div className="row no-gutters">
                <div className="col-4 d-flex align-items-stretch">
                    <img
                        src={item.photo}
                        className="card-img d-inline-flex p-2"
                        alt="..."
                        style={{
                            marginLeft : '10%',
                            width : '95%',
                            height : '90%',
                            borderRadius : "7%"
                        }} 
                    />
                </div>
                <div className="col-8 d-flex flex-column">
                    <div className="card-body p-1 mr-2">
                        <h5 className="card-title ml-2 mt-2" style={{height:40}}> {item.name} </h5>
                        <p className="card-text"> {item.desc} </p>
                    </div>
                    <div className='card-body d-grid gap-2 d-md-flex justify-content-md-end mr-2'style={{ paddingTop: '0px' }}>
                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => {deleteAviso(item.id)}}>Borrar</button>
                    </div>
                </div> 
                
            </div>
        </div>
    );
}

export default SignCard;
