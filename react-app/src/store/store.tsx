import { configureStore } from '@reduxjs/toolkit'
import { Api } from '../services/Api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import {persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist'

const reducer = combineReducers ({
  auth: authReducer,
  [Api.reducerPath]: Api.reducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}


const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  }}).concat(Api.middleware),
})
const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)

export  {store, persistor}