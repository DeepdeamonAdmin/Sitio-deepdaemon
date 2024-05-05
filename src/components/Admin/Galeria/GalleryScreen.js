//Uso de React
import React from 'react'

//Uso de Bootstrap
import { Nav, Tab } from "react-bootstrap";

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'
import GalleryList from './GalleryList';

export const GalleryScreen = () => {

	//Obtención del ususario del estado
	var user = useSelector(state => state.user);

	//Despliegue de la galería con sus distintas categorías
	return (
		<div>
			<h1>Pagina Galeria</h1>
			<ModalAddGalery />
			<div className='row'>
				<div className="col-md-2 mb-2">
					<AddNewFab/>
				</div>
			</div>
			<Tab.Container defaultActiveKey="Tesis">
			{(user.rol==="administrador")&&(
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
			)}
			{(user.rol!="administrador")&&(
				<Nav className="projects">
					<Nav.Item>
						<Nav.Link eventKey="Tesis">
							<h4 className="">Tesis</h4>
						</Nav.Link>
					</Nav.Item>
				</Nav>
			)}
				<hr />
				<Tab.Content style={{marginLeft:"30px",marginRight:"30px"}}>
					<Tab.Pane eventKey="Alumno">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Alumno" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Aviso">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Aviso" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Externo">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Externo" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Lider">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Lider" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Proyecto">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Proyecto" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Publicacion" className=''>
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Publicacion" />
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="Tesis">
						<div className="row d-flex" style={{gap:"5px"}}>
								<GalleryList status="Tesis" />
						</div>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</div>
	)
}
