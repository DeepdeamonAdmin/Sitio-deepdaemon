import React, { useEffect, useState } from 'react'
const InfoVideo = ( video ) =>{
    //const [videoId, setVideoId] = useState('');
    //const [videoTitle, setVideoTitle] = useState('');
    const [videoImg,setVideoImg] = useState('');
    useEffect(() => {
        const partes = video.urlVideo.split('/');
        var ultimaParte = partes[partes.length - 1];
        var parametros = ultimaParte.split('?');
        var cadena_entre_slash_y_interrogacion = parametros[0];
        const thumbnailUrl = `https://img.youtube.com/vi/${cadena_entre_slash_y_interrogacion}/default.jpg`;
        setVideoImg(thumbnailUrl);
    
    }, [video.urlVideo]);
    return(
        <>
        <div class="col-2">
            <img
                src={videoImg}
                alt={video.title}
                width = "130px"
            />
        </div>
        <div class="col-5">
            <div class="card-body">
                <h5 class="card-title">{video.title}</h5><br></br>
                <a href={video.urlVideo} target="_blank">{video.urlVideo}</a>
            </div>
        </div>
        </>
    )
}
export default InfoVideo;