import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'
import GalleryList from './GalleryList';
import { Container, Nav, Tab } from "react-bootstrap";

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
			<Tab.Container defaultActiveKey="Publicacion">
				<Nav className="projects">
					<Nav.Item>
						<Nav.Link eventKey="Alumno">
							<h4 className="">Alumno</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Aviso">
							<h4 className="">Aviso</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Externo">
							<h4 className="">Externo</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Lider">
							<h4 className="">Líder</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Proyecto">
							<h4 className="">Proyecto</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Publicacion">
							<h4 className="">Publicacion</h4>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Tesis">
							<h4 className="">Tesis</h4>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<hr />
				<Tab.Content>
					<Tab.Pane eventKey="Alumno">
						<GalleryList status="Alumno" />
					</Tab.Pane>
					<Tab.Pane eventKey="Aviso">
						<GalleryList status="Aviso" />
					</Tab.Pane>
					<Tab.Pane eventKey="Externo">
						<GalleryList status="Externo" />
					</Tab.Pane>
					<Tab.Pane eventKey="Lider">
						<GalleryList status="Lider" />
					</Tab.Pane>
					<Tab.Pane eventKey="Proyecto">
						<GalleryList status="Proyecto" />
					</Tab.Pane>
					<Tab.Pane eventKey="Publicacion">
						<GalleryList status="Publicacion" />
					</Tab.Pane>
					<Tab.Pane eventKey="Tesis">
						<GalleryList status="Tesis" />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
			{/*<div className='section' style={{position: 'static'}}>
				<div className="card-columns " style={{display: 'flex', flexWrap: "wrap"}}>
					<GalleryList />
				</div>
	</div>*/}
		</div>
	)
}
