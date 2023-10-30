import React from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, query } from "firebase/firestore";
import { VerMasPublication } from '../ui/VerMasPublication';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { auth } from '../../firebase/firebase-config';
import { useSelector } from 'react-redux';

export const PublicationScreen = ({ type }) => {
  //const [publications, setPublications] = React.useState([]);
	const user = auth.currentUser;
  const publications  = useSelector(state => state.publications);
  var publications_type = publications.publications.filter(publication => type.includes(publication.postType) && publication.display === "Yes");
  publications_type = publications_type.slice().sort(compararFechas);
  function esFechaInvalida(fechaString) {
    const fecha = new Date(fechaString);
    return isNaN(fecha) || fecha.toString() === 'Invalid Date';
  }
  function compararFechas(a, b) {
    if (esFechaInvalida(a.yearMonth)) {
      return 1; // a es inválida, va después de b
    }
    if (esFechaInvalida(b.yearMonth)) {
      return -1; // b es inválida, va después de a
    }
    return new Date(b.yearMonth) - new Date(a.yearMonth); // Ordenar fechas válidas
  }
  /*React.useEffect(() => {
    const getPublications = async () => {
      try {
        const ref = collection(db, "Publicaciones");
        const q = query(ref, where("postType", '==', type));
        const Data = await getDocs(q);
        const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        function esFechaInvalida(fechaString) {
          const fecha = new Date(fechaString);
          return isNaN(fecha) || fecha.toString() === 'Invalid Date';
        }
        
        function compararFechas(a, b) {
          if (esFechaInvalida(a.yearMonth)) {
            return 1; // a es inválida, va después de b
          }
          if (esFechaInvalida(b.yearMonth)) {
            return -1; // b es inválida, va después de a
          }
          return new Date(b.yearMonth) - new Date(a.yearMonth); // Ordenar fechas válidas
        }
        const fechasOrdenadas = arrayData.slice().sort(compararFechas);
        setPublications(fechasOrdenadas);
      } catch (error) {
        console.log(error);
      }
    };
    getPublications();
  }, [type]);*/

  if (publications.length === 0) {
    return <p className="team_title">No hay publicaciones disponibles por el momento.</p>;
  }

  return (
    <>
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-center ml-1">
          {publications_type.map(publication => {
            return (
              publication.display === "Yes" && (
                <div className="col-4 d-flex" key={publication.id} style={{minWidth:"350px",flexWrap:"wrap",paddingRight:0, paddingLeft:"10px"}}>
                  <div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ height: 170, width:"100%", position: 'relative' }}>
                    <div className='row justify-content-left d-flex' style={{width:"100%"}}>
                      <div className='col-4 col-sm-auto col-md-auto col-lg-auto col-xl-auto d-flex align-items-center pr-0'>
                      <img
                        className="card-img ml-3 mr-0 pr-0"
                        src={publication.urlImg}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          height: "110px",
                          width: '110px',
                          borderRadius: '5px'
                        }}
                        alt="member"
                      />
                      </div>
                      <div className='col pl-0 mt-2'>
                        <div className="card-body" style={{position:"relative"}}>
                          <h6 className="card-title" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 5,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '5.9em',
                          }}>
                            {publication.title}
                          </h6>
                          <div className="text-right d-flex" style={{position:"absolute", top:"75px", right:"0px",justifyContent:"right"}}>
                            {!user && <ModalCrearCuenta />}
                            <VerMasPublication publicacion={publication} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
