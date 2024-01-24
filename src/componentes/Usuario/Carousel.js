import React, { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

export const Carousel = ({avisos, youtubes}) => {
  let tiempo = 5000;
  const splideRef = useRef();
  useEffect(() => {
  }, []);
  let lo = 0
  if (avisos.length <= 3) {
    lo = avisos.length;
  }
  if (avisos.length > 3) {
    lo = 4
  }
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
  return (
    <Splide  options={options} ref={splideRef} onmouseover={tiempo=100000} autoPlay={true}>
        {avisos.map((aviso) => (
          <SplideSlide >
            <img src={aviso.photo}/>
          </SplideSlide>
        ))}
        {youtubes.map((video) => (
            <SplideSlide> 
            <iframe
                className="embed-responsive"
                src={"https://www.youtube.com/embed/"+video.urlVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </SplideSlide>
        ))}
    </Splide>
  );
};