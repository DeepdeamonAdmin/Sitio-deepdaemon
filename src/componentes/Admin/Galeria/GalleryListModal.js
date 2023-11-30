import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


export default function GalleryListModal({GlAMg,status}) {
	var gallery = useSelector(state => state.gallery);
	useEffect(() => {
	}, [])
	return (
		<>
			{
				gallery.gallery.map(category => category.id==status && category.gallery.map(imagen =>(
					<div className="card p-2 border-primary mb-3" key={imagen.id} style={{ width: 220 }}>
						<img
							className='card-img'
							src={imagen.photo}
							alt={'imagen'}
							style={{
								height: '200px',
								width: '200px'
							}}
							onClick={() => GlAMg(imagen.photo)}
						/>
						<span>{imagen.name}</span>
					</div>
				)))
			}
		</>
	)
}