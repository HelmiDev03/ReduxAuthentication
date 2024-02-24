

import { combineReducers } from "redux";


import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import successReducer from './successReducer';
import usersReducer from './usersReducer';





export default combineReducers({
    auth: userReducer,
    errors: errorsReducer,
    users : usersReducer,
    success: successReducer
   
  
})