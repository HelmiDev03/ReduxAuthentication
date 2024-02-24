
import { SUCCESS } from "./type";

// Define the initial state outside the reducer function
const initialState = {
    
} ;

// Define the type for the action


// Define the reducer function
const successReducer= (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
             return action.payload ? action.payload : state;
    
        default:
            return state;
    }
};

export default successReducer;
