import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uiCurrentModal, uiOpenModal } from "../../actions/ui";
import { ModalInfoProject } from "./ModalInfoProject";

export const ProjectDetaills = ({ color, project }) => {
  const dispatch = useDispatch();
  const [currentModal, setCurrentModal] = useState(null);
  const [showInf, setShowInfo] = useState(false);

  const handleClickNew = () => {
    // dispatch(uiOpenModal());
    setShowInfo(!showInf);
  };

  return (
    <>
      <button className={`btn btn-${color}`} onClick={handleClickNew}>
        {!showInf ? "Ver más.." : "Ver menos"}
      </button>
      {showInf && (
        <div className="d-flex flex-col animate__animated animate__fadeIn">
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">Resultados: {project.results}</li> */}
            {/* <li className="list-group-item"><a href={project.link} class="card-link">GitHub</a></li> */}
            <div className="text-center">
              <iframe
                className="mt-3 text-center"
                //src="https://www.youtube.com/embed/OG0w_4qDiy8"
                src={project.url}
                title="YouTube video player"
                gesture="media"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style={{ width: 250, height: 200 }}
              ></iframe>
            </div>
            <li className={`list-group-item text-white bg-${color}`}>
              Descripción: {project.descripcion}
            </li>
          </ul>
          {/* <div class="col-sm"> */}

          {/* </div> */}
        </div>
      )}
    </>
  );
};
