//Uso de React
import React from 'react';

//Componentes necesarios
import FormEditVideo from './FormEditVideo';

const YouTubeScreen = () => {
  //Pantalla principal de los videos de YouTube
  return (
    <div className="row">
      <div>
        <h2> Gestor de Videos de YouTube </h2>
        <FormEditVideo />
      </div>
    </div>
  );
};

export default YouTubeScreen;
