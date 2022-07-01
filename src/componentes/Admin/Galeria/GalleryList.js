import React from 'react'
import { useSelector } from 'react-redux'

export default function GalleryList() {
	const { usuarios } = useSelector(state => state.user);
	return (
		<>
			{
				usuarios.map(usuario => (
					usuario.urlImg != "" &&
					<div className="card w-50 p-2 border-primary mb-3 view overlay zoom" key={usuario.id}>
						<img
							className='card-img'
							src={usuario.urlImg}
							alt='member'
							style={{
								height: '200px',
								width: '200px'
							}}
						/>
					</div>
				))
			}
		</>
	)
}
