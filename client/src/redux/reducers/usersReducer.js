

// Define the initial state outside the reducer function
const initialState = ([{}])

// Define the type for the action


// Define the reducer function
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return action.payload ? action.payload : state;

        case "DELETE_USER":
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};


export default usersReducer;
