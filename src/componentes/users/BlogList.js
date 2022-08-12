import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase-config';

export default function BlogList() {
	const { uid } = useSelector(state => state.auth)
	// console.log(uid);
	const [blog, setBlog] = useState([])

	const blogCollection = collection(db, `Blog`);

	const getBlog = async () => {
		const datos = await getDocs(blogCollection);
		setBlog(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
	}

	useEffect(() => {
		getBlog()
	})
	return (
		<>
			{
				blog.map(comentario => (

                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                src={comentario.Foto} className="card-img" 
                                alt="..." 
                                style={{
                                    width: "150px"
                                }}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{comentario.Nombre}</h5>
                                    <p className="card-text">{comentario.Comentario}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
				))
			}
		</>
	)
}
