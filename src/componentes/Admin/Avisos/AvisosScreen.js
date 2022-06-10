import React from 'react'
import ModalAddSign from './ModalAddSign'
import { AddNewFab } from '../../ui/AddNewFab';
import AvisosList from './AvisosList';
export default function AvisosScreen() {
	return (
		<>
			<div className="Container">
				<div className="row">
					<div className="col mb-3">
						<h1> AVISOS</h1>
					</div>
				</div>
				<div className="row">
					{/* <SearchScreen /> */}
					<div className="col-md-2 mb-2">
						<ModalAddSign />
						<AddNewFab />
					</div>
				</div>
			</div>
			<div>
				<AvisosList />
			</div>
		</>
	)
}
