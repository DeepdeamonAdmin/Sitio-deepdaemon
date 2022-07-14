import React from 'react'
import { useSelector } from 'react-redux'

export default function GalleryList() {
	const { imagenes } = useSelector(state => state.gallery);
	return (
		<>
			{
				imagenes.map(imagen => (
					<div className="card p-2 border-primary mb-3" key={imagen.id} style={{ width: 12 + "rem" }}>
						<img
							className='card-img'
							src={imagen.photo}
							alt={'imagen'}
							style={{
								height: '200px',
								width: '200px'
							}}
						/>
						<span>{imagen.name}</span>
					</div>
				))
			}
		</>
	)
}
