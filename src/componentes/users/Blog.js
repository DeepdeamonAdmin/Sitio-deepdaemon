import React from 'react'
import fotoPerfil from '../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../actions/user';
import { useForm } from '../../hooks/useForm';
import { startNewComment } from '../../actions/comments';
import BlogList from './BlogList';

export const Blog = () => {

    const dispatch = useDispatch();

    //Obtener el id del usuario logeado
    const { usuarios } = useSelector(state => state.user);
    const { uid } = useSelector(state => state.auth);
    
    //Obtener los datos del usuario con id = uid
    const nombreLogeado = usuarios.filter(usuario => usuario.id === uid)[0].nombre;
    const urlImg = usuarios.filter(usuario => usuario.id === uid)[0].urlImg;


    const [formValues, handleInputChange, reset] = useForm({
		Comentario: '',
        Foto: urlImg,
        Nombre: nombreLogeado,
	})
	const { Comentario, Foto, Nombre } = formValues

    const handleSave = () => {
		dispatch(startNewComment(formValues));
		reset();
	}

    return (
        <div>
            <h1> Blog DeepDaemon </h1>

            <BlogList />
        
            <div className="form-group">
                <h3>Escribe un comentario</h3>
                <input type="text" className="form-control" placeholder="Nombre" name="Nombre" value={nombreLogeado} onChange={handleInputChange} hidden />
                <input type="text" className="form-control" placeholder="Foto" name="Foto" value={urlImg} onChange={handleInputChange} hidden />
                <textarea className="form-control" id="Comentario" rows="3" name="Comentario" onChange={handleInputChange}></textarea>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>Publicar</button>
            </div>
        </div>
    )
}
