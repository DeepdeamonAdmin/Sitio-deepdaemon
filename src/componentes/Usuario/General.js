import React from 'react'


//imagenes fijas
import join from "../../styles/assets/img/sitio/mastermind.png";
import logo from "../../styles/assets/img/sitio/deepdaemon.png";
import QR from "../../assets/qrcontacto.png";

import "../../styles/assets/icomoon/icomoon.css"; //https://icomoon.io/#preview-free checar si se usa 
import "../../styles/DeepDaemon.css";
import { Container, Nav, Carousel } from 'react-bootstrap';
import { Row, Col, Button, Image, Ratio } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { LeaderScreen } from './LeaderScreen';
import { TeamScreen } from './TeamScreen';
import FormCorreo from './FormCorreo';

import { useEffect, useState } from 'react';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';


export const General = ({ id }) => {

	//Configurar hooks
	const [avisos, setAvisos] = useState([]);
	//Referenciar db de firebase
	const avisosCollection = collection(db, 'Avisos');
	//Función para obtener todos los avisos
	const getAvisos = async () => {
		const datos = await getDocs(avisosCollection);
		//console.log(datos.docs)
		setAvisos(
			datos.docs.map(doc => { return { ...doc.data(), id: doc.id } })
		);
	}
	//Función para eliminar un aviso

	//Usar useEffect
	useEffect(() => {
		getAvisos();
	}, [])

	return (
		<div className="">
			<div className='d-flex flex-row dd_header'>
				<div className='' id='Home'>
					<img src={logo} className="ddlogo" alt="logo" />
					<h1>DeepDaemon</h1>
					<hr />
					<h2>Comunidad de conocimiento</h2>
				</div>
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/OG0w_4qDiy8"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen>
				</iframe>
			</div>
			<h1>ANUNCIOS</h1>

			<Container className='section'>
				<Carousel className="w-100">
					{avisos.map(aviso => (
						<Carousel.Item key={aviso.id}>
							<Image src={aviso.photo} className="w-100" />
							<Carousel.Caption>
								<h3>{aviso.name}</h3>
								<p>{aviso.desc}</p>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>


			<Container className="section" id='Nosotros'>
				<h1>Un poco sobre nosotros</h1>
				<hr />
				<p>
					Somos un grupo de trabajo que busca vincular el desarrollo
					científico con el desarrollo de soluciones industriales para generar
					tecnología de punta y capital humano de alto impacto en el ámbito
					académico e industrial.
				</p>
			</Container>

			<Container className="section">
				<Row>
					<Col>
						<div className='text-center'><span className="icon icon-eye" /></div>
						<h2>Visión</h2>
						<p>
							Que el grupo de trabajo y sus integrantes sean un referente a
							nivel mundial en el desarrollo de tecnologías de punta a nivel
							científico, académico y comercial, capacitando a capital humano
							de excelente calidad y desarrollando proyectos con alto impacto
							comercial y social.
						</p>
					</Col>
					<Col>
						<div className='text-center'><span className="icon icon-quill" /></div>
						<h2>Misión</h2>
						<p>
							Desarrollar sistemas inteligentes basados en redes neuronales
							profundas que puedan ser distribuidos a usuarios reales, con el
							objetivo de favorecer una educación integral a los estudiantes
							del grupo de trabajo.
						</p>
					</Col>
					<Col>
						<div className='text-center'><span className="icon icon-heart" /></div>
						<h2>Valores</h2>
						<p>
							Intregridad, Confianza, Comunicaciones honestas y abiertas,
							Pasión por trabajar para hacer un cambio en el mundo.
						</p>
					</Col>
				</Row>
			</Container>

			<Container fluid className="academy">
				<Container className="section white">
					<h1>La Investigación no solo es académica</h1>
					<hr />
					<p>
						Por eso creamos un grupo de investigación que tiene como objetivo
						usar la inteligencia artificial para resolver problemas de la
						industria.
					</p>
				</Container>
			</Container>

			{/* <Container fluid className="section portfolio" id='Publicaciones'>
				<h1> Publicaciones </h1>

				<Tab.Container defaultActiveKey="inDevelop">
					<Nav className="projects">
						<Nav.Item><Nav.Link eventKey="inDevelop"><h1>Novedades</h1></Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link eventKey="completed"><h1>Destacado</h1></Nav.Link></Nav.Item>
					</Nav>
					<hr />
					<Tab.Content>
						<Tab.Pane eventKey="inDevelop">
							<PublicationScreen />
						</Tab.Pane>
						<Tab.Pane eventKey="completed">
							<PublicationScreen />
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Container> */}

			<Container fluid className="section portfolio" id='Lideres'>
				<h1>Los líderes</h1>
				<hr />
				<LeaderScreen />
			</Container>

			<Container fluid className="team_separator">
				<Container className="section white">
					<h1>Inteligencia colectiva</h1>
					<hr />
					<h2>
						Alumnos e Investigadores colaborando para resolver problemas
						multidisciplinarios.
					</h2>
				</Container>
			</Container>

			<Container className="section">
				<Row>
					<Col md="auto">
						<Image src={join} style={{ height: "320px" }} fluid />
					</Col>
					<Col>
						<h1>Únete al equipo!</h1>
						<p>
							Si eres estudiante de Licenciatura o Posgrado en el IPN, o estás
							interesdo en complementar tu educación con un postgrado en el
							Centro de Investigación en Computación, y quieres desarrollar
							proyectos de IA aplicados a problemas reales o industriales, te
							estamos buscando.
						</p>
						<div className='text-center'>
							<Button variant="secondary ">Contáctanos</Button>
						</div>
					</Col>
				</Row>
			</Container>


			<Container fluid className="section" id='Equipo'>
				<h1>Colaboradores</h1>
				<Tab.Container defaultActiveKey="current">
					<Nav className="projects">
						<Nav.Item><Nav.Link eventKey="current"><h1>Las Promesas</h1></Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link eventKey="graduate"><h1>Los egresados</h1></Nav.Link></Nav.Item>
					</Nav>
					<hr />
					<Tab.Content>
						<Tab.Pane eventKey="current">
							<TeamScreen status='current' />
						</Tab.Pane>
						<Tab.Pane eventKey="graduate">
							<TeamScreen status='graduate' />
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Container>

			<Container fluid className="section contact white" id='Contacto'>
				<h1>Hecho en la Ciudad de México</h1>
				<hr />
				<p>
					<span className="icon icon-home" />
					Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal,
					<br />
					Col. Nueva Industrial Vallejo, Delegación Gustavo A. Madero. CDMX
				</p>
				<Image src={QR} style={{ height: "200px" }} alt="QR Contacto" />
				<p>
					<FormCorreo />
					<span className="icon icon-envelop" />
					<a href="mailto:contacto@deepdaemon.org">
						contacto@deepdaemon.org{" "}
					</a>
				</p>
				<p>
					<a href="https://twitter.com">
						<span className="icon icon-twitter" />
					</a>
					|
					<a href="https://www.facebook.com">
						<span className="icon icon-facebook" />
					</a>
				</p>
				<hr />
				<footer>&copy; DeepDaemon 2019</footer>
			</Container>
		</div>
	)
}
