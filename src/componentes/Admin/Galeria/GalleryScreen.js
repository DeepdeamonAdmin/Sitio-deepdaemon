import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'
import GalleryList from './GalleryList';

export const GalleryScreen = () => {
	return (

		<div>
			<h1>Pagina Galeria</h1>
			<ModalAddGalery />
			<div className='row'>
				<div className="col-md-2 mb-2">
					<AddNewFab/>
				</div>
			</div>
			<div className='section' style={{position: 'static'}}>
				<div className="card-columns " style={{display: 'flex', flexWrap: "wrap"}}>
					<GalleryList />
				</div>
			</div>
		</div>
	)
}
