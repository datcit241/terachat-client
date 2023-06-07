import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import customization from './customizationReducer';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user']
}
const store = configureStore({
  // reducer: {
  //     cart: cartReducer,
  //     user: userReducer
  // }
  reducer: persistReducer(persistConfig, combineReducers({
    user: userReducer,
    customization
  })),
  middleware: [thunk]
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //         serializableCheck: {
  //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //         },
  //     }),
});

const persister = persistStore(store);
export { store, persister };
