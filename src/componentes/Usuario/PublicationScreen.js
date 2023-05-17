import React from 'react'
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import { PublicationDetaills } from './PublicationDetaills';
import { VerMas } from '../ui/VerMas';
import { ModalCrearCuenta } from './ModalCrearCuenta';
import { VerMasProject } from '../ui/VerMasProject';

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
		<div className="card-columns cards-cols animate__animated animate__fadeIn">
			{
				publications.map(publication => {
					return (
						//imprimir solamente si el estado es igual al seleccionado
						(publication.display === "Yes") && (
							<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ MaxWidth: 360, height: 150 , position:'relative' }}>

								<div className="card-body text-dark">
									<h6 className="card-title"> {publication.title} </h6>
									<ModalCrearCuenta />
									<VerMasProject publicacion={publication}/>
								</div>
							</div>
						)
					);
				})
			}
		</div >
	)
}
