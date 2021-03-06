import { createStore, combineReducers, applyMiddleware, compose } from "redux"; // para autenticación
import thunk from 'redux-thunk'; //uso de middleware
import { authReducer } from "../reducers/authReducer";
import { avisoReducer } from "../reducers/avisoReducer";
import { deleteReducer } from "../reducers/deleteReducer";
import { editReducer } from "../reducers/editReducer";
import { galleryReducer } from "../reducers/galleryReducer.";
import { institucionReducer } from "../reducers/institucionReducer";
import { projectsReduccer } from "../reducers/projectsReduccer";
import { publicationsReduccer } from "../reducers/publicationsReduccer";
import { registerReducer } from "../reducers/registerReducer";
import { uiReduccer } from "../reducers/uiReducer";


import { userReducer } from "../reducers/userReduccer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
	auth: authReducer,
	ui: uiReduccer,
	reg: registerReducer,
	delete: deleteReducer,
	edit: editReducer,
	//para perfil individual
	user: userReducer,
	aviso: avisoReducer,
	projects: projectsReduccer,
	publications: publicationsReduccer,
	gallery: galleryReducer,
	institutions: institucionReducer,
})

export const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware(thunk)
	)

);