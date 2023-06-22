import React from "react";

//imagenes fijas
import join from "../../styles/assets/img/sitio/mastermind.png";
import logo from "../../styles/assets/img/sitio/deepdaemon.png";
import cic from "../../styles/assets/img/sitio/cic.png";
import QR from "../../assets/QR_Actualizado.jpeg";

import '@splidejs/react-splide/css';
import '@splidejs/splide/css/skyblue';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import "../../styles/carrusel.css"

import "../../styles/assets/icomoon/icomoon.css"; //https://icomoon.io/#preview-free checar si se usa
import "../../styles/DeepDaemon.css";
import { Container, Nav, Carousel } from "react-bootstrap";
import { Row, Col, Button, Image, Ratio } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { LeaderScreen } from "./LeaderScreen";
import { TeamScreen } from "./TeamScreen";
import { ProjectScreen } from "./ProjectScreen";
import { TesisScreen } from "./TesisScreen";
import FormCorreo from "./FormCorreo";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { PublicationScreen } from "./PublicationScreen";

export const General = ({ id }) => {
  //Configurar hooks
  const [avisos, setAvisos] = useState([]);
  //Referenciar db de firebase
  const avisosCollection = collection(db, "Avisos");
  //Función para obtener todos los avisos
  const getAvisos = async () => {
    const datos = await getDocs(avisosCollection);
    setAvisos(
      datos.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  //Función para eliminar un aviso

  //Usar useEffect
  useEffect(() => {
    getAvisos();
  }, []);

  //Opciones para configurar el carrusel 
  let lo = 0
  if (avisos.length <= 2) {
    lo = 2
  }
  if (avisos.length > 2) {
    lo = 4
  }
  const options = {
    type: 'loop',
    gap: '2rem',
    perPage: lo,
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    slideFocus: true,
    focus: true,
  };

  return (
    <div className="">
      <div className="d-flex flex-row dd_header">
        <Row className="d-flex flex-row">
          <div className="col-sm" id="Home">
            <img src={cic} className="ddcic" alt="cic" />
            <img src={logo} className="ddlogo" alt="logo" />
            <h1>Laboratorio de Ciencias </h1>
            <h1>Cognitivas Computacionales</h1>
            <hr />
            <h2>Comunidad de conocimiento</h2>
          </div>
          <div class="col-sm">
            <iframe
              className="embed-responsive"
              src="https://www.youtube.com/embed/OG0w_4qDiy8"
              title="YouTube video player"
              gesture="media"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Row>
      </div>
      <div className="embed-responsive">
      <div className="wrapper" style={{ maxWidth: `${1000 + 200 * (avisos.length - 4)}px`, margin: 'auto', marginTop: 4 }}>
          <Splide options={options} aria-labelledby="autoplay-example-heading" hasTrack={false}>
            <div style={{ position: 'relative' }}>
              <SplideTrack>
                {avisos.map((aviso) => (
                  <SplideSlide>
                    <img src={aviso.photo} />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </div>
          </Splide>
        </div>

        {/* <Container>
            <Carousel>
              {avisos.map((aviso) => (
                <Carousel.Item key={aviso.id}>
                  <Image
                    src={aviso.photo}
                    style={{ width: "100%", height: "900px" }}
                  />
                  <Carousel.Caption>
                    <h3>{aviso.name}</h3>
                    <p>{aviso.desc}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container> */}
        <Container className="section" id="Nosotros">
          <h1>Un poco sobre nosotros</h1>
          <hr />
          <p>
            Somos un grupo de trabajo que busca vincular el desarrollo científico
            con el desarrollo de soluciones industriales para generar tecnología
            de punta y capital humano de alto impacto en el ámbito académico e
            industrial.
          </p>
        </Container>

        <Container className="section">
          <Row>
            <Col>
              <div className="text-center">
                <span className="icon icon-eye" />
              </div>
              <h2>Visión</h2>
              <p>
                Que el grupo de trabajo y sus integrantes sean un referente a
                nivel mundial en el desarrollo de tecnologías de punta a nivel
                científico, académico y comercial, capacitando a capital humano de
                excelente calidad y desarrollando proyectos con alto impacto
                comercial y social.
              </p>
            </Col>
            <Col>
              <div className="text-center">
                <span className="icon icon-quill" />
              </div>
              <h2>Misión</h2>
              <p>
                Desarrollar sistemas inteligentes basados en redes neuronales
                profundas que puedan ser distribuidos a usuarios reales, con el
                objetivo de favorecer una educación integral a los estudiantes del
                grupo de trabajo.
              </p>
            </Col>
            <Col>
              <div className="text-center">
                <span className="icon icon-heart" />
              </div>
              <h2>Valores</h2>
              <p>
                Intregridad, Confianza, Comunicaciones honestas y abiertas, Pasión
                por trabajar para hacer un cambio en el mundo.
              </p>
            </Col>
          </Row>
        </Container>

        <br></br>
        <Container fluid className="academy">
          <Container className="section white">
            <br></br>
            <h1>La Investigación no solo es académica</h1>
            <hr />
            <p>
              Por eso creamos un grupo de investigación que tiene como objetivo
              usar la inteligencia artificial <br></br> para resolver problemas de la
              industria.
            </p>
          </Container>
        </Container>

        <br></br>
        <br></br>
        <div className="Container" id="Lideres">
          <h1>LOS LÍDERES</h1>
          <hr />
          <br></br>
          <div className="row">
            <LeaderScreen />
          </div>
        </div>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Container fluid className="section portfolio proy_sectionBg" id="Proyectos">
          <h1 className="separator2 team_title"> Proyectos </h1>
          <hr />
          <Tab.Container defaultActiveKey="indevelop">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="indevelop">
                  <h2 className="team_title">Novedades</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">
                  <h2 className="team_title">Destacado</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="indevelop">
                <ProjectScreen status1="indevelop" status2="registered" />
              </Tab.Pane>
              <Tab.Pane eventKey="completed">
                <ProjectScreen status1="completed" status2="" />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
        <br></br>
        <br></br>


        <Container fluid className="section portfolio pub_sectionBg" id="Publicaciones">
          <h1 className="separator"> Publicaciones </h1>
          <Tab.Container defaultActiveKey="magazine">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="congress">
                  <h2 className="team_title">Congresos</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="magazine">
                  <h2 className="team_title">Revistas</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="book">
                  <h2 className="team_title">Libro</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="congress">
                <div className="Container section" style={{ height: 620, overflow: "hidden", position: "relative" }}>
                  <div className="row overflow-scroll" style={{ position: "absolute", top: 80, bottom: -20, left: 0, right: "3px" }}>
                    <PublicationScreen type="article" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="magazine" >
                <div className="Container section" style={{ height: 620, overflow: "hidden", position: "relative" }}>
                  <div className="row overflow-scroll" style={{ position: "absolute", top: 80, bottom: -20, left: 0, right: "3px" }}>
                    <PublicationScreen type="magazine" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="book" >
                <div className="Container section" style={{ height: 620, overflow: "hidden", position: "relative" }}>
                  <div className="row overflow-scroll" style={{ position: "absolute", top: 80, bottom: -20, left: 0, right: "3px" }}>
                    <PublicationScreen type="book" />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
            <br></br>
          </Tab.Container>
        </Container>
        <br></br>

        <br></br>
        <Container fluid className="section sections team_sectionBg" id="Equipo">
          <h1 className="team_title">Equipo</h1>
          <Tab.Container defaultActiveKey="current">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="current">
                  <h2 className="team_title">Las Promesas</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="graduate">
                  <h2 className="team_title">Los egresados</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="current">
                <div className="Container section" style={{ height: 560, overflow: "hidden", position: "relative" }}>
                  <div className="row overflow-scroll" style={{ position: "absolute", top: 80, bottom: -20, left: 0, right: "3px" }}>
                    <TeamScreen status="current" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="graduate">
                <div className="Container section" style={{ height: 560, overflow: "hidden", position: "relative" }}>
                  <div className="row overflow-scroll" style={{ position: "absolute", top: 80, bottom: -20, left: 0, right: "3px" }}>
                    <TeamScreen status="graduate" />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
        <br></br>

        <br></br>
        <Container fluid className="section portfolio" id="Tesis">
          <h1 className="separator"> Tesis </h1>
          <Tab.Container defaultActiveKey="indevelop">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="indevelop">
                  <h2 className="team_title">En desarrollo</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">
                  <h2 className="team_title">Finalizadas</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="indevelop">
                <TesisScreen status1="indevelop" status2="registered" />
              </Tab.Pane>
              <Tab.Pane eventKey="completed">
                <TesisScreen status1="completed" status2="" />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
        <br></br>

        <br></br>
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
        <br></br>

        <br></br>
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
              <div className="text-center">
                <Image src={QR} style={{ height: "200px" }} alt="QR Contacto" />
                <br />
                {/*<Button variant="secondary ">Contáctanos</Button>*/}
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="section contact white" id="Contacto">
          <h1>Hecho en la Ciudad de México</h1>
          <hr />
          <p>
            <span className="icon icon-home" />
            Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal,
            <br />
            Col. Nueva Industrial Vallejo, Delegación Gustavo A. Madero. CDMX
          </p>
          <p>
            <FormCorreo />
            <span className="icon icon-envelop" />
            <a href="mailto:contacto@deepdaemon.org">contacto@deepdaemon.org </a>
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
    </div>


  );
};
