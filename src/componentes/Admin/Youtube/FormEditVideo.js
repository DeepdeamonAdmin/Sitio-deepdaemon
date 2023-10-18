import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import InfoVideo from './InfoVideo';
import { startsNewYoutube, startLoadingYoutube } from '../../../actions/youtube';
import { get } from 'react-scroll/modules/mixins/scroller';


const FormEditVideo = () =>{
    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [videos, setVideos] = useState("false");
    const videosCollection = collection(db, `Youtube`);
    var youtubes = useSelector(state => state.youtubes);
    youtubes = youtubes.videos;
    
	const getVideos = async () => {
		const datos = await getDocs(videosCollection);
		/*setVideos(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);*/
        youtubes = datos.docs.map(doc => { return { ...doc.data(), id: doc.id } });
	}
    const [formValues, handleInputChange] = useForm({
        urlVideo: '',
        title:''
    });
    const { urlVideo, title } = formValues;
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startsNewYoutube(formValues));
        getVideos();
        formValues.urlVideo="";
        formValues.title="";
        setVideos("true");
    }
    useEffect(() => {
        //setVideos(youtubes.videos);
		//getVideos();
	}, [])
    const deleteVideo = async (id) => {
        console.log(id);
        console.log(youtubes);
		const youtubeDoc = doc(db, `Youtube/${id}`);
		await deleteDoc(youtubeDoc);
		Swal.fire('Video Eliminado', 'Éxito');
        dispatch(startLoadingYoutube());
		getVideos();
	}
    return(
        <>
        <div className="container">
            <div className="row-6 d-flex  justify-content-center border-bottom border-secondary">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label>Url del video</label>
                        <input
                            className="form-control"
                            type='text'
                            name='urlVideo'
                            placeholder='URL del Video'
                            value={urlVideo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row mb-3">
                        <label>Título del video</label>
                        <input
                            className="form-control"
                            type='text'
                            name='title'
                            placeholder='Título del video'
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row mb-3 ">
                        <button
                            className="btn2 btn-primary btn-large btn-block"
                            type="submit"
                        >
                            Agregar
                        </button>

                    </div>
                </form>
            </div>
            <div style={{marginTop:"20px"}}>
                {
                    youtubes.map(video=>(
                        <div className="card" style={{maxWidth: "100%",}} key={video.id}>
                            <div className="row d-flex align-items-center justify-content-between">
                                <InfoVideo {...video}/>
                                <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() => {deleteVideo(video.id)}}>Borrar</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )

}
export default FormEditVideo;
