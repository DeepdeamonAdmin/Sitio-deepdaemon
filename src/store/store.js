import { createStore, combineReducers, applyMiddleware, compose } from "redux"; // para autenticación
import thunk from 'redux-thunk'; //uso de middleware
import { accesoRolReduccer } from "../reducers/accesoRolReduccer";

import { authReducer } from "../reducers/authReducer";
import { deleteReducer } from "../reducers/deleteReducer";
import { editReducer } from "../reducers/editReducer";
import { registerReducer } from "../reducers/registerReducer";
import { uiReduccer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReduccer,
    rol: accesoRolReduccer,
    reg: registerReducer,
    delete: deleteReducer,
    edit: editReducer

})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
        )
  
);