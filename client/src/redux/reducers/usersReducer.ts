// Define the initial state type
interface User {
    // Define your user properties here
}

type UsersState = User[];

// Define the initial state
const initialState: UsersState = [{}];

// Define the action types
interface SetUsersAction {
    type: "SET_USERS";
    payload: UsersState; // Adjust the type according to your payload data type
}

interface DeleteUserAction {
    type: "DELETE_USER";
    payload: UsersState; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type UsersActionTypes = SetUsersAction | DeleteUserAction;

// Define the reducer function
const usersReducer = (state: UsersState = initialState, action: UsersActionTypes): UsersState => {
    switch (action.type) {
        case "SET_USERS":
        case "DELETE_USER":
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

export default usersReducer;
