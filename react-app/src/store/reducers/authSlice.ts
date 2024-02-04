import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface AuthState {
    user: {
        _id: string | null
        name: string | null
        email: string | null
        role: string | null
    }
}

const initialState: AuthState = {
    user: {
        _id: null,
        name: null,
        email: null,
        role: null
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            const { user } = action.payload
            //save to localstorage
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
            return state
        },
        resetUser: (state) => {
            //remove from localstorage
            localStorage.removeItem('user')
            state = initialState
            return state
        }
    }
})

export const selectAuth = (state: RootState) => state.auth

export const selectCurrentUser = (state: RootState) => state.auth.user
export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer