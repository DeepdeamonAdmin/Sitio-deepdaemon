//Uso de React
import React, { useEffect, useState } from 'react';

const InfoVideo = (video) => {
  //Uso del hook useState para fijar la imagen de cada video
  const [videoImg, setVideoImg] = useState('');

  //Uso del hook useEffect para obtener la información de la imagen del video de YouTube
  useEffect(() => {
    //Dividir el link respecto a "/"
    const partes = video.urlVideo.split('/');

    //Seleccionar la última parte
    var ultimaParte = partes[partes.length - 1];

    //Dividir respecto a "?"
    var parametros = ultimaParte.split('?');

    //Obtener el primer parámetro
    var cadena_entre_slash_e_interrogacion = parametros[0];

    //Construir la imagen con base en el id del video de YouTube
    const thumbnailUrl = `https://img.youtube.com/vi/${cadena_entre_slash_e_interrogacion}/default.jpg`;

    //Fijar la imagen
    setVideoImg(thumbnailUrl);
  }, [video.urlVideo]);

  //Despliegue de la tarjeta del video
  return (
    <>
      <div class="col-2">
        <img src={videoImg} alt={video.title} width="130px" />
      </div>
      <div class="col-5">
        <div class="card-body">
          <h5 class="card-title">{video.title}</h5>
          <br></br>
          <a href={video.urlVideo} target="_blank">
            {video.urlVideo}
          </a>
        </div>
      </div>
    </>
  );
};
export default InfoVideo;
