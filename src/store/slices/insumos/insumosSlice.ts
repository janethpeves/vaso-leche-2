import { createSlice } from "@reduxjs/toolkit";

export interface InsumosState {
	isLoading: boolean;
	insumosGenerales: any;
	registroDistribucion: any;
	currentDistribucion: any;
}

const initialState: InsumosState = {
	isLoading: true,
	insumosGenerales: [],
	registroDistribucion: [],
	currentDistribucion: {},
};

export const insumosSlice = createSlice({
	name: "insumos",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		addInsumosGenerales: (state, action) => {
			state.insumosGenerales = [
				...state.insumosGenerales,
				{ id: state.insumosGenerales.length + 1, ...action.payload },
			];
		},
		setRegistroDistribucion: (state, action) => {
			state.registroDistribucion = [
				...state.registroDistribucion,
				{ id: state.registroDistribucion.length + 1, ...action.payload },
			];
		},

		setCurrentDistribucion: (state, action) => {
			state.currentDistribucion = action.payload;
		},
	},
});

export const { isLoading, addInsumosGenerales, setRegistroDistribucion, setCurrentDistribucion } =
	insumosSlice.actions;
