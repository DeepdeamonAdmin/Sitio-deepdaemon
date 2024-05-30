//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Componentes necesarios
import { startsNewTech } from '../../../actions/tecnologias';

const FormAddTech = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Contenido del formulario para una nueva tecnología
  const [formValues, handleInputChange] = useForm({
    name: '',
  });
  const { name } = formValues;

  //Función para subir una nueva tecnología
  const handleSubmit = (e) => {
    e.preventDefault();

    //Enviar al estado la nueva tecnología
    dispatch(startsNewTech(formValues));
  };

  //Despliegue del formulario para una nueva tecnología
  return (
    <div className="login">
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="col mb-3">
          <label>Nombre </label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <button
            className="btn2 btn-primary btn-large btn-block"
            type="submit"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddTech;
