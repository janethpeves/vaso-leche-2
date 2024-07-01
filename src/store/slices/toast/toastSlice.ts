import { createSlice } from "@reduxjs/toolkit";

export interface ToastState {
	isLoading: boolean;
	toastConfig: {
		severity: "success" | "info" | "warn" | "error" | "";
		summary: string;
		detail: string;
	};
}

const initialState: ToastState = {
	isLoading: true,
	toastConfig: {
		severity: "",
		summary: "",
		detail: "",
	},
};

export const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setToast: (state, action) => {
			state.toastConfig = action.payload;
		},
		clearToast: (state) => {
			state.toastConfig = {
				severity: "",
				summary: "",
				detail: "",
			};
		},
	},
});

export const { isLoading, setToast, clearToast } = toastSlice.actions;
