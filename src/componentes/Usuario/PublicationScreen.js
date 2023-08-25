import React from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, query } from "firebase/firestore";
import { VerMasPublication } from '../ui/VerMasPublication';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { auth } from '../../firebase/firebase-config';

export const PublicationScreen = ({ type }) => {
  const [publications, setPublications] = React.useState([]);
	const user = auth.currentUser;

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
    <>
    <div className="container card-columns" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      {
        publications.map(publication=>(
          publication.display==="Yes"&&(
            <div key={publication.id} className="card mb-4 mr-2" style={{maxWidth:"400px",minWidth:"300px", maxHeight:"160px"}}>
              <div className="row-md-1 mb-1 bg-light d-flex" style={{borderRadius:"5px",height:"160px"}}>
                <div className="col-4 d-flex" style={{margin:"5px",padding:0,alignItems:"center"}}>
                  <img
                    className="card-img"
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
                <div className="col" style={{paddingLeft:0}}>
                    <div className="card-body" style={{position:"relative",paddingBottom:0,marginBottom:0}}>
                      <h6 className="card-title" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: '3.6em',
                      }}>
                        {publication.title}
                      </h6>
                      <div className="text-right d-flex" style={{position:"relative", justifyContent:"right"}}>
                        {!user && <ModalCrearCuenta />}
												<VerMasPublication publicacion={publication} />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          )
        ))
      }
    </div>
    {/*<div className="container">
      <div className="row">
        {publications.map(publication => {
          return (
            publication.display === "Yes" && (
              <div className="col-md-4" key={publication.id}>
                <div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ maxWidth: 400, height: 170, position: 'relative' }}>
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
                    {/* Limitar el título a dos líneas con puntos suspensivos 
                    <h6 className="card-title" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
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
      </div>*/}
    </>
  );
};
