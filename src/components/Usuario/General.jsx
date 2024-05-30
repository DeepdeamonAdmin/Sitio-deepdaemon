//Uso de React
import React from 'react';
import { useEffect, useState } from 'react';

//Uso de Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

//Uso de ReactGA
import ReactGA from 'react-ga';

//imagenes fijas
import join from '../../styles/assets/img/sitio/mastermind.png';
import logo from '../../styles/assets/img/sitio/deepdaemon.png';
import cic from '../../styles/assets/img/sitio/cic.png';
import QR from '../../assets/QR_20_07_2023.jpeg';

//Uso de Bootstrap y CSS
import '../../styles/assets/icomoon/icomoon.css'; //https://icomoon.io/#preview-free checar si se usa
import '../../styles/DeepDaemon.css';
import { Container, Nav } from 'react-bootstrap';
import { Row, Col, Image } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//Componentes necesario
import { LeaderScreen } from './LeaderScreen';
import { TeamScreen } from './TeamScreen';
import { ProjectScreen } from './ProjectScreen';
import { TesisScreen } from './TesisScreen';
import { PublicationScreen } from './PublicationScreen';
import { Carousel } from './Carousel';

export const General = ({ id }) => {
  //Configurar hooks para los avisos y videos
  const [avisos, setAvisos] = useState([]);
  const [youtubes, setYoutubes] = useState([]);

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

  //Colección en la BD de los videos de YouTube
  const youtubeCollection = collection(db, 'Youtube');

  //Obtención de los videos de la BD
  const getYoutubes = async () => {
    const datos = await getDocs(youtubeCollection);
    var youtube = datos.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    for (var i = 0; i < youtube.length; i++) {
      const regex = /(?:live|be)\/([a-zA-Z0-9_-]+)/;
      const url = youtube[i].urlVideo;
      const match = regex.exec(url);
      youtube[i].urlVideo = match[1];
    }
    setYoutubes(youtube);
  };

  //Usar useEffect
  useEffect(() => {
    const fetchData = async () => {
      await getAvisos();
      await getYoutubes();
    };

    fetchData();
  }, []);

  //Tracking con Google Analytics
  ReactGA.send(document.location.pathname);

  //Despliegue de la página principal
  return (
    <div className="">
      <div className="d-flex flex-row dd_header">
        <div className="container">
          <Row className="d-flex flex-row " style={{ width: '100%' }}>
            <div className="col-sm mb-4" id="Home">
              <div className="content" style={{ position: 'relative' }}>
                <img src={cic} className="ddcic" alt="cic" />
                <img src={logo} className="ddlogo" alt="logo" />
                <h1>Laboratorio de Ciencias </h1>
                <h1>Cognitivas Computacionales</h1>
                <hr />
                <h2>Comunidad de conocimiento</h2>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div className="embed-responsive">
        <div
          className="wrapper"
          style={{
            maxWidth: `${1300 + 260 * (avisos.length - 4)}px`,
            margin: 'auto',
            marginTop: 4,
          }}
        >
          <Carousel avisos={avisos} youtubes={youtubes} />
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
            <Col>
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
            <Col>
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
            <Col>
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
          className="section portfolio pub_sectionBg"
          id="Publicaciones"
        >
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
              <Nav.Item>
                <Nav.Link eventKey="inbook">
                  <h2 className="team_title">Capítulos de libro</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="congress">
                <div
                  className="Container section"
                  style={{
                    height: 620,
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
                      paddingBottom: '10px',
                    }}
                  >
                    <PublicationScreen type="conference" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="magazine">
                <div
                  className="Container section"
                  style={{
                    height: 620,
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
                    <PublicationScreen type={['magazine', 'article']} />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="book">
                <div
                  className="Container section"
                  style={{
                    height: 620,
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
                    <PublicationScreen type="book" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="inbook">
                <div
                  className="Container section"
                  style={{
                    height: 620,
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
                    <PublicationScreen type="inbook" />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
            <br></br>
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
                    height: 650,
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
                    height: 650,
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
          <p>
            <a href="">
              <span className="icon icon-twitter" />
            </a>
            <a href="">
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
