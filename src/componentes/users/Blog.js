import React from 'react'
import fotoPerfil from '../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../actions/user';
import { useForm } from '../../hooks/useForm';

export const Blog = () => {

    const dispatch = useDispatch();

    const { datos:datoUser } = useSelector( state => state.user );

    //Imprimir el nombre del usuario
    const nombre = datoUser.nombre;

    /*
    //Obtener las publicaciones
    const publications = getPublications();

    //Función para obtener todas las publicaciones
    const getPublications = async () => {
        const response = await fetch('http://localhost:3000/api/publications');
        const publications = await response.json();
        return publications;
    }
    */

    //Función OnSubmit para el formulario de publicación
    const handleSubmit = (e) => {
        e.preventDefault();
        //Obtener el comentario del textarea y guardarlo en una variable
        const comment = document.getElementById('comentario').value;
        //Enviar las variables nombre y comment al servidor
        const data = {
            nombre: nombre,
            comment: comment
        }
        //Enviar el comentario al servidor
        fetch('http://localhost:3000/api/publications', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //Recargar la página
        window.location.reload();
    }


  return (
    <div>
        <h1> Blog DeepDaemon </h1>

        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Nombre del Usuario</h5>
                        <p className="card-text">Contenido del comentario</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="form-group">
            <h3>Escribe un comentario</h3>
            <textarea className="form-control" id="comentario" rows="3"></textarea>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Publicar</button>
        </div>
    </div>
  )
}
