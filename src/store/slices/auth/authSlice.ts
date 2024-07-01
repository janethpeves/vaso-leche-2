import { createSlice } from "@reduxjs/toolkit";
import defaultUser from "@/data/users.json";

export interface AuthState {
	isLoading: boolean;
	login: boolean | null;
	users: any;
}

const initialState: AuthState = {
	isLoading: true,
	login: null,
	users: defaultUser.users,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},

		setLogin: (state, action) => {
			state.login = action.payload;
			state.isLoading = false;
		},

		setUsers: (state, action) => {
			state.users = [...state.users, { id: state.users.length + 1, ...action.payload }];
		},
	},
});

export const { isLoading, setLogin, setUsers } = authSlice.actions;
