import axios from 'axios';
import { ERRORS } from "../reducers/type";




 const  ErrorsActions = (data ) => dispatch => {
    dispatch({
        type: ERRORS,
        payload: data
    })
};

export default ErrorsActions;
