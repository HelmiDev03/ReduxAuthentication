

import { combineReducers } from "redux";


import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import successReducer from './successReducer';





export default combineReducers({
    auth: userReducer,
    errors: errorsReducer,
    success: successReducer
   
  
})