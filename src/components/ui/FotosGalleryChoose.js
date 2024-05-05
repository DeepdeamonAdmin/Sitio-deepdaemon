//Uso de React
import React from 'react';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Componentes necesarios
import { uiOpenModal } from '../../actions/ui';
import './Ui.css';

export const FotosGalleryChoose = () => {

    //Declaración del dispatch
    const dispatch = useDispatch();

    //Función para manejar el clic sobre la foto
    const handleClickNew = () => {

        //Envio al estado la apertura del modal
        dispatch( uiOpenModal() );
    }

    //Despliegue del botón con la foto a elegir
    return (
        <button
            className="btn btn-primary"
            onClick={ handleClickNew }
        >
           Elegir foto
        </button>
    )
}
