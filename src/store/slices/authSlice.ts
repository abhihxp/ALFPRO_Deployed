import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
    permissions: string[];
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    tenantId: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    tenantId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; tenantId: string }>
        ) => {
            state.user = action.payload.user;
            state.tenantId = action.payload.tenantId;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.tenantId = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
