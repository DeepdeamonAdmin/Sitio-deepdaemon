//Uso de React
import React from 'react';
import { useEffect, useState } from 'react';

//Uso de Splide
import '@splidejs/react-splide/css';
import '@splidejs/splide/css/skyblue';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

//Uso de Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

//Componentes necesarios
import { LeaderScreen } from './LeaderScreen';
import { TeamScreen } from './TeamScreen';
import { ProjectScreen } from './ProjectScreen';
import FormCorreo from './FormCorreo';

//Uso de Bootstrap y CSS
import '../../styles/carrusel.css';
import '../../styles/assets/icomoon/icomoon.css'; //https://icomoon.io/#preview-free checar si se usa
import '../../styles/DeepDaemon.css';
import { Container, Nav, Carousel } from 'react-bootstrap';
import { Row, Col, Button, Image, Ratio } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

//imagenes fijas
import join from '../../styles/assets/img/sitio/mastermind.png';
import logo from '../../styles/assets/img/sitio/deepdaemon.png';
import cic from '../../styles/assets/img/sitio/cic.png';
import QR from '../../assets/QR_Actualizado.jpeg';

export const GeneralMobile = ({ id }) => {
  //Configurar hooks para los avisos
  const [avisos, setAvisos] = useState([]);

  //Referenciar db de firebase
  const avisosCollection = collection(db, 'Avisos');

  //Función para obtener todos los avisos
  const getAvisos = async () => {
    const datos = await getDocs(avisosCollection);
    setAvisos(
      datos.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      }),
    );
  };

  //Usar useEffect
  useEffect(() => {
    //Obtención de los avisos de la BD
    getAvisos();
  }, []);

  //Opciones para configurar las ventanas el carrusel
  let lo = 0;
  if (window.innerWidth < 700 || avisos.length < 2) lo = 1;
  else if (window.innerWidth < 1000 && avisos.length > 2) lo = 2;
  else lo = 3;

  //Configuración de las propiedades del carousel
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

  //Despliegue de la pantalla principal de la versión mobile
  return (
    <div className="">
      <div className="d-flex flex-row dd_header" style={{ overflow: 'hidden' }}>
        <Row className="d-flex flex-row">
          <div className="" id="Home">
            <img src={cic} className="ddcic" alt="cic" />
            <img src={logo} className="ddlogo" alt="logo" />
            <h1>Laboratorio de Ciencias </h1>
            <h1>Cognitivas Computacionales</h1>
            <hr />
            <h2>Comunidad de conocimiento</h2>
          </div>
        </Row>
      </div>
      <div className="embed-responsive">
        <div
          className="wrapper"
          style={{
            maxWidth: `${1000 + 200 * (avisos.length - 4)}px`,
            margin: 'auto',
            marginTop: 4,
          }}
        >
          <Splide
            options={options}
            aria-labelledby="autoplay-example-heading"
            hasTrack={false}
          >
            <div style={{ position: 'relative' }}>
              <SplideTrack>
                {avisos.map((aviso, index) => (
                  <SplideSlide key={index}>
                    <img src={aviso.photo} />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </div>
          </Splide>
        </div>
        <Container className="section" id="Nosotros">
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
            <Col className="col-12 p-1">
              <div className="text-center">
                <span className="icon icon-eye" />
              </div>
              <h2>Visión</h2>
              <p>
                Que el grupo de trabajo y sus integrantes sean un referente a
                nivel mundial en el desarrollo de tecnologías de punta a nivel
                científico, académico y comercial, capacitando a capital humano
                de excelente calidad y desarrollando proyectos con alto impacto
                comercial y social.
              </p>
            </Col>
            <Col className="col-12 p-1">
              <div className="text-center">
                <span className="icon icon-quill" />
              </div>
              <h2>Misión</h2>
              <p>
                Desarrollar sistemas inteligentes basados en redes neuronales
                profundas que puedan ser distribuidos a usuarios reales, con el
                objetivo de favorecer una educación integral a los estudiantes
                del grupo de trabajo.
              </p>
            </Col>
            <Col className="col-12 p-1">
              <div className="text-center">
                <span className="icon icon-heart" />
              </div>
              <h2>Valores</h2>
              <p>
                Intregridad, Confianza, Comunicaciones honestas y abiertas,
                Pasión por trabajar para hacer un cambio en el mundo.
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
              usar la inteligencia artificial <br></br> para resolver problemas
              de la industria.
            </p>
          </Container>
        </Container>
        <br></br>
        <br></br>
        <Container>
          <h1>LOS LÍDERES</h1>
          <hr />
          <br></br>
          <Tab.Container defaultActiveKey="leader">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="leader">
                  <h2 className="team_title">Líderes</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="colaborator">
                  <h2 className="team_title">Colaboradores</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="leader">
                <div className="Container" id="Lideres">
                  <div className="row">
                    <LeaderScreen status="leader" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="colaborator">
                <div className="Container" id="Lideres">
                  <div className="row">
                    <LeaderScreen status="colaborator" />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Tab.Container>
        </Container>
        <Container
          fluid
          className="section portfolio proy_sectionBg"
          id="Proyectos"
        >
          <h1 className="separator2 team_title"> Proyectos </h1>
          <hr />
          <Tab.Container defaultActiveKey="indevelop">
            <Nav className="projects">
              <Nav.Item>
                <Nav.Link eventKey="indevelop">
                  <h2 className="team_title">En desarrollo</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">
                  <h2 className="team_title">Finalizados</h2>
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
        <Container
          fluid
          className="section sections team_sectionBg"
          id="Equipo"
        >
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
                <div
                  className="Container section"
                  style={{
                    height: 560,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    className="row overflow-scroll"
                    style={{
                      position: 'absolute',
                      top: 80,
                      bottom: -20,
                      left: 0,
                      right: '3px',
                    }}
                  >
                    <TeamScreen status="current" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="graduate">
                <div
                  className="Container section"
                  style={{
                    height: 560,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    className="row overflow-scroll"
                    style={{
                      position: 'absolute',
                      top: 80,
                      bottom: -20,
                      left: 0,
                      right: '3px',
                    }}
                  >
                    <TeamScreen status="graduate" />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
        <br></br>
        <br></br>
        <Container>
          <h5 style={{ textAlign: 'center' }}>
            Para ver más secciones y el contenido completo, dirigete a la
            versión de escritorio.
          </h5>
          <p>
            Recuerda hacerlo desde un dispositivo con las dimensiones necesarias
            para poder observar de manera correcta el contenido
          </p>
          <Button id="toDeskVersion" style={{ width: '100%' }}>
            {' '}
            Versión de Escritorio
          </Button>
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
              <Image src={join} style={{ height: '320px' }} fluid />
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
                <Image src={QR} style={{ height: '200px' }} alt="QR Contacto" />
                <br />
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
          <div>
            <FormCorreo />
            <span className="icon icon-envelop" />
            <a href="mailto:contacto@deepdaemon.org">
              contacto@deepdaemon.org{' '}
            </a>
          </div>
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
