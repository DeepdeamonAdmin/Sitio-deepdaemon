import React from 'react'
import './users.css'
import fotoPerfil from '../../assets/Usuario.jpg';

export const Perfil = () => {
  const nombre = '';
  const descripcion='';
  return (
    <div className='container'>
      <div className="center-user">
        <table className='tb-cliente'>
          <tr>
            <td rowSpan={3}>
              <img className='foto' src={fotoPerfil} alt="Foto de Perfil" />
            </td>
            <td colSpan={2}>
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
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
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
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
            <td>
              <div className='container'> 
                <select
                  className="form-control datos"
                  name='modalType'
                  // onChange={ handleInputChange }
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
                  // onChange={ handleInputChange }
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
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
          <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
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
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colspan={3}>
              <div className='container'> 
              <input 
                type='label'
                placeholder='Nombre:' 
                className='form-control datos' 
                name='name' 
                required
                value={nombre}
                // onChange={ handleInputChange }
              />        
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className='caja-btn'>
              <button className='btn btn-secondary'>
                Cambiar Contraseña
              </button>
            </td>
            <td className='caja-btn'>
              <button className='btn btn-secondary'>
                Cambiar Contraseña
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )  
}
