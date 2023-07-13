import React from 'react'
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import { PublicationDetaills } from './PublicationDetaills';
import { VerMas } from '../ui/VerMas';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMasPublication } from '../ui/VerMasPublication';

export const PublicationScreen = ({type}) => {
 //const { projectsAll } = useSelector(state => state.publications);
	//console.log(projectsAll)
	const [publications, setPublications] = React.useState([])
	React.useEffect(() => {
		const getPublications = async () => {
			try {
                const ref = collection(db, "Publicaciones")
				const q = query(ref, where("postType", '==', type))
                //console.log(q)
                const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
				setPublications(arrayData)
				
			} catch (error) {
				console.log(error)
			}
		}
		getPublications()
	}, [])
	//console.log(publications)
	if (publications.length === 0) {
		return <p className="team_title">No hay publicaciones disponibles por el momento.</p>;
	}
	return (
        <div className="container-fluid">
            {publications.length === 0 && <p>No se encontraron publicaciones por el momento.</p>}
            <div className="row">
                {publications.map((publication, index) => (
                    // Imprimir solamente si el estado es igual al seleccionado
                    publication.display === "Yes" && (
                        <div key={publication.id} className="col-md-4 mb-3">
                            <div className="card h-100" style={{ margin: 0 }}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            className="card-img"
                                            src={publication.urlImg}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                height: "100%",
                                                width: '100%',
                                                maxHeight: "90px",
                                                maxWidth: '90px'
                                            }}
                                            alt="member"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body text-dark d-flex flex-column h-100">
                                            <h6 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {publication.title}
                                            </h6>
                                            <div className="text-right">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-right">
                                                <ModalCrearCuenta />
                                                <VerMasPublication publicacion={publication} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
