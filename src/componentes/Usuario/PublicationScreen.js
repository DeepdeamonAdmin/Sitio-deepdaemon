import React from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, query } from "firebase/firestore";
import { VerMasPublication } from '../ui/VerMasPublication';
import { ModalCrearCuenta } from './ModalCrearCuenta';

export const PublicationScreen = ({ type }) => {
  const [publications, setPublications] = React.useState([]);

  React.useEffect(() => {
    const getPublications = async () => {
      try {
        const ref = collection(db, "Publicaciones");
        const q = query(ref, where("postType", '==', type));
        const Data = await getDocs(q);
        const arrayData = Data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPublications(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    getPublications();
  }, [type]);

  if (publications.length === 0) {
    return <p className="team_title">No hay publicaciones disponibles por el momento.</p>;
  }

return (
  <div className="container">
    <div className="row">
      {publications.map(publication => {
        return (
          publication.display === "Yes" && (
            <div className="col-md-4" key={publication.id}>
              <div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ maxWidth: 360, height: 170, position: 'relative' }}>
                <img
                  className="card-img mt-3 ml-2"
                  src={publication.urlImg}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    height: "110px",
                    width: '110px'
                  }}
                  alt="member"
                />
                <div className="card-body text-dark">
                  {/* Limitar el título a tres líneas con puntos suspensivos */}
                  <h6 className="card-title" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxHeight: '3.6em',
                  }}>
                    {publication.title}
                  </h6>
                  <ModalCrearCuenta />
                  <VerMasPublication publicacion={publication} />
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  </div>
);
};
