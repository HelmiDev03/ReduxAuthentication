import { SUCCESS } from "./type";

// Define the initial state type
interface InitialState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: InitialState = {
    // Initialize your initial state properties here
};

// Define the action type
interface SuccessAction {
    type: string;
    payload: any; // Adjust the type according to your payload data type
}

// Define the reducer function
const successReducer = (state: InitialState = initialState, action: SuccessAction) => {
    switch (action.type) {
        case SUCCESS:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

export default successReducer;