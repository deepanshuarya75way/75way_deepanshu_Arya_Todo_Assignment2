import { configureStore } from '@reduxjs/toolkit'
import { Api } from '../services/Api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authReducer from './reducers/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [Api.reducerPath]: Api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)