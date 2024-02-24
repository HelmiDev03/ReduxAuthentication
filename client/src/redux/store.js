import { configureStore} from '@reduxjs/toolkit'





import Reducers from './reducers'



// Automatically adds the thunk middleware and the Redux DevTools extension

let initialState = {}

const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: Reducers,
    preloadedState: initialState,
   
})
  
export default store