import { AppThunk } from "../../store";

import { isLoading, setLogin, setUsers } from "./authSlice";
import { selectUsers } from "./selectors";

export const getUser = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const users = selectUsers(getState());

			let authUser = users.find(
				(user: any) => user.correo === payload.correo && user.password === payload.password
			);

			if (authUser) {
				dispatch(setLogin(authUser));
			} else {
				alert("Las credenciales no son las correctas");
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const createUser = (payload: any): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(setUsers(payload));
		} catch (error) {
			console.log(error);
		}
	};
};

export const logoutUser = (): AppThunk => {
	return (dispatch) => {
		dispatch(setLogin(null));
	};
};
