

// Define the initial state outside the reducer function
const initialState = {
    isConnected: false,
    user: {},
};

// Define the type for the action


// Define the reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                
                user: action.payload,
                isConnected: ! state.isConnected // Update to true if setting user means the user is connected
            };

            case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
                isConnected: true
               
            };
        default:
            return state;
    }
};


export default userReducer;
