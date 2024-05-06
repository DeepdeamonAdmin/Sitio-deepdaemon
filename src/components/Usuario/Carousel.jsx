//Uso de React
import React, { useEffect, useRef } from "react";

//Uso de Splide
import { Splide, SplideSlide } from '@splidejs/react-splide';

export const Carousel = ({avisos, youtubes}) => {

  //Tiempo entre cada transición del Carousel
  let tiempo = 5000;

  //Obtención de la referencia del Splide
  const splideRef = useRef();

  //useEffect para cargar los datos del Carousel
  useEffect(() => {
  }, []);

  //Configuración de avisos en la pantalla
  let lo = 0
  if (avisos.length <= 3) {
    lo = avisos.length;
  }
  if (avisos.length > 3) {
    lo = 4
  }

  //Configuración de las propiedades del carousel
  const options = {
    type: 'loop',
    gap: '2rem',
    perPage: lo,
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    slideFocus: true,
    focus: true,
  };

  //Despliegue del carousel
  return (
    <Splide options={options} ref={splideRef} onMouseOver={() => tiempo = 100000} autoPlay={true}>
      {avisos.map((aviso, index) => (
        <SplideSlide key={index}>
          <img src={aviso.photo} alt={`Aviso ${index}`} />
        </SplideSlide>
      ))}
      {youtubes.map((video, index) => (
        <SplideSlide key={index}>
          <iframe
            className="embed-responsive"
            src={"https://www.youtube.com/embed/" + video.urlVideo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SplideSlide>
      ))}
    </Splide>
  );
};