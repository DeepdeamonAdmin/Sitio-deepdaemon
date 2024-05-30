//Para autenticación
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

//Uso de middleware
import thunk from 'redux-thunk';

//Reducers
import { authReducer } from '../reducers/authReducer';
import { avisoReducer } from '../reducers/avisoReducer';
import { galleryReducer } from '../reducers/galleryReducer.';
import { institucionReducer } from '../reducers/institucionReducer';
import { projectsReduccer } from '../reducers/projectsReduccer';
import { publicationsReduccer } from '../reducers/publicationsReduccer';
import { uiReduccer } from '../reducers/uiReducer';
import { tesisReducer } from '../reducers/tesisReducer';
import { userReducer } from '../reducers/userReduccer';
import { youtubeReducer } from '../reducers/youtubeReducer';

//Definición para el middleware
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  //Generales
  auth: authReducer,
  ui: uiReduccer,
  //Para perfil individual
  user: userReducer,
  avisos: avisoReducer,
  projects: projectsReduccer,
  publications: publicationsReduccer,
  gallery: galleryReducer,
  institutions: institucionReducer,
  tesis: tesisReducer,
  youtubes: youtubeReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
