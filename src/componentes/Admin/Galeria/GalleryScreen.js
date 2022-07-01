import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'
import GalleryList from './GalleryList';

export const GalleryScreen = () => {
	return (

		<div>
			<h1>Pagina Galeria</h1>
			<ModalAddGalery />
			<AddNewFab />
			<div className='section'>
				<div className="card-columns ">
					<GalleryList />
				</div>
			</div>
		</div>
	)
}
