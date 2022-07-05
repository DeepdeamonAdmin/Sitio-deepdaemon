import { createStore, combineReducers, applyMiddleware, compose } from "redux"; // para autenticación
import thunk from 'redux-thunk'; //uso de middleware
import { authReducer } from "../reducers/authReducer";
import { deleteReducer } from "../reducers/deleteReducer";
import { editReducer } from "../reducers/editReducer";
import { galleryReducer } from "../reducers/galleryReducer.";
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
	projects: projectsReduccer,
	publications: publicationsReduccer,
	gallery: galleryReducer,


})

export const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware(thunk)
	)

);