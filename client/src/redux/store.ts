import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers/index';
import { persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistore = persistStore(store);

export { store, persistore };
