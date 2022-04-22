import React, { useEffect } from 'react'
import './users.css'
import fotoPerfil from '../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../actions/user';
import { useForm } from '../../hooks/useForm';

export const Perfil = () => {

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
    <div className='container'>
      <div className="center-user">
        <table className='tb-user'>
          <tr>
            <td rowSpan={3}>
              <div onClick={ handlePictureClick }>
                <img className='foto' src={urlImg ||fotoPerfil} alt="Foto de Perfil" />
              </div>
            </td>
            <td colSpan={2}>
              <input 
                  id="fileSelector"
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  onChange={ handleFileChange }
              />
              <p className='titulo'>Información Básica </p>
            </td>
          </tr>
          <tr>
            <td colspan={2}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='nombre' 
                required
                value={nombre}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td>
            <div className='container'> 
              <input 
                type='date' 
                className='form-control datos' 
                name='fechaNac' 
                required
                value={fechaNac}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
            <td>
              <div className='container'> 
                <select
                  className="form-control datos"
                  name='grado'
                  value={grado}
                  onChange={ handleInputChange }
                >
                  <option value = 'current' > Current </option>
                  <option value = 'graduate' > Graduate </option>
                  <option value = 'Leader' > Leader </option>
                  <option value = 'out' > Out </option>
                </select>   
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className='container'> 
                <textarea
                  className="form-control datos"
                  rows='6' 
                  name='descripcion'
                  placeholder='Descripcion'
                  value = { descripcion }
                  onChange={ handleInputChange }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <hr/>
              <p className='titulo'>Formación</p>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Institución' 
                className='form-control datos' 
                name='school' 
                required
                value={school}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Unidad: ' 
                className='form-control datos' 
                name='unidad' 
                required
                value={unidad}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Titulo:' 
                className='form-control datos' 
                name='titulo' 
                required
                value={titulo}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <hr/>
              <p className='titulo'>Enlaces</p>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='email'
                placeholder='Email:' 
                className='form-control datos' 
                name='email' 
                required
                value={email}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='url'
                placeholder='Linkedin:' 
                className='form-control datos' 
                name='linkedin' 
                required
                value={linkedin}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='url'
                placeholder='Github:' 
                className='form-control datos' 
                name='Github' 
                required
                value={Github}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='url'
                placeholder='Facebook' 
                className='form-control datos' 
                name='facebook' 
                required
                value={facebook}
                onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='caja-btn'>
              <button
               className='btn btn-secondary'
               onClick={ handleSave }
              >
                Guardar
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )  
}
