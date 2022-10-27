import React, { useEffect } from 'react'
import './users.css'
import fotoPerfil from '../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../actions/user';
import { useForm } from '../../hooks/useForm';
import { General } from '../Usuario/General';
export const User = () => {

  const dispatch = useDispatch();

  const { datos:datoUser } = useSelector( state => state.user );
  const [ formValues, handleInputChange ] = useForm(datoUser);

  const { nombre, email, fechaNac, urlImg, grado,
          descripcion, school, unidad, titulo, linkedin, facebook, Github } = formValues;

  const { active } = useSelector( state => state.user );

  
  useEffect(() => {
         
    dispatch( activeData( {...formValues} ) );

  }, [formValues, dispatch])

  const handleSave = () => {
    dispatch( startSaveData( active ) );
  }

   //carga de imagenes
  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if ( file ) {
      dispatch( startUploading( file ) );
    }
  }

  return (
    //Ajustes y perfil de usuario
    <div>
      <General/>
     {/*
      <h1>Ajustes y perfil de usuario</h1>

      <div className="container">
        <div className="row">

          <div className="col-md-6">

            <label>Nombre</label>
            <input type="text" className="form-control" value={nombre} />

            <label>Email</label>
            <input type="text" className="form-control" value={email} />

            <label>Fecha de nacimiento</label>
            <input type="date" className="form-control" value={fechaNac} />

            <label>Descripcion</label>
            <textarea className="form-control" value={descripcion} />

            <label>Grado</label>
            <select
              className="form-control"
              name='grado'
              value={grado}
              onChange={ handleInputChange }
            >
              <option value = 'current' > Current </option>
              <option value = 'graduate' > Graduate </option>
              <option value = 'Leader' > Leader </option>
              <option value = 'out' > Out </option>
            </select> 

            <label>Escuela</label>
            <input type="text" className="form-control" value={school + " - " + unidad} />

          </div>

          <div className="col-md-6">

            <label>Foto de perfil</label>
            <div className="img-container">
              <img src={urlImg || fotoPerfil} alt="foto de perfil" width="150px"/>
              <br></br>
              <input type="file" id="fileSelector" onChange={handleFileChange} />
            </div>
            
            <br></br>

            <label>Github</label>
            <input type="text" className="form-control" value={Github} />

            <label>LinkedIn</label>
            <input type="text" className="form-control" value={linkedin} />

            <label>Facebook</label>
            <input type="text" className="form-control" value={facebook} />

          </div>

        </div>
      </div>
    */}
    </div>
  )
}
