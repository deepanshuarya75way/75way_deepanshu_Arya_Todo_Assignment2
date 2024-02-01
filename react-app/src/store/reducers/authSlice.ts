import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface AuthState {
    user: {
        _id: string | null
        name: string | null
        email: string | null
    }
}

const initialState: AuthState = {
    user: {
        _id: null,
        name: null,
        email: null,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            const { user } = action.payload
            console.log(user)
            state.user = user
            return state
        },
        resetUser: (state) => {
            state = initialState
            return state
        }
    }
})

export const selectAuth = (state: RootState) => state.auth

export const selectCurrentUser = (state: RootState) => state.auth.user
export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer