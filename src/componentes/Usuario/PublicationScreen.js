import React from 'react'
import {db} from '../../firebase/firebase-config';
import { collection, getDocs, where, get, query } from "firebase/firestore";
import { PublicationDetaills } from './PublicationDetaills';


export const PublicationScreen = ({type}) => {
 //const { projectsAll } = useSelector(state => state.publications);
	//console.log(projectsAll)
	const [publications, setPublications] = React.useState([])
	React.useEffect(() => {
		const getPublications = async () => {
			try {
                const ref = collection(db, "Publicaciones")
				const q = query(ref, where("postType", '==', type))
                console.log(q)
                const Data = await getDocs(q);
				const arrayData = Data.docs.map(doc => ({id: doc.id, ...doc.data()}))
				setPublications(arrayData)
				
			} catch (error) {
				console.log(error)
			}
		}
		getPublications()
	}, [])
	console.log(publications)
	return (
		<div className="card-columns cards-cols animate__animated animate__fadeIn">
			{
				publications.map(publication => (
					//imprimir solamente si el estado es igual al seleccionado
					(publication.display === "Yes") && (
						<div className="d-flex flex-row card animate__animated animate__fadeIn border-primary mb-3" style={{ MaxWidth: 350, MaxHeight: 150 }} >
							
							<div className="card-body text-dark">
								<h5 className="card-title"> {publication.title} </h5>
								{/* {<ModalInfoProject item={publication} key={publication.id} id={publication.id} />} */}
								<PublicationDetaills color={"primary"} publication={publication} />
							</div>
						</div>
					)
				))
			}
		</div >
	)
}
