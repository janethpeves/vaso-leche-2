import { createSlice } from "@reduxjs/toolkit";

export interface MadreInsumoState {
	isLoading: boolean;
	repartoInsumos: any;
	currentRepartoInsumos: any;
	historialMadre: any;
}

const initialState: MadreInsumoState = {
	isLoading: true,
	repartoInsumos: [],
	currentRepartoInsumos: {},
	historialMadre: [],
};

export const madreInsumosSlice = createSlice({
	name: "madreInsumos",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setRepartoInsumos: (state, action) => {
			state.repartoInsumos = [
				...state.repartoInsumos,
				{ id: state.repartoInsumos.length + 1, ...action.payload },
			];
		},
		updateRepartoInsumos: (state, action) => {
			state.repartoInsumos = action.payload;
		},
		setCurrentRepartoInsumos: (state, action) => {
			state.currentRepartoInsumos = action.payload;
		},
		setHistorialMadre: (state, action) => {
			state.historialMadre = action.payload;
		},
	},
});

export const {
	isLoading,
	setRepartoInsumos,
	updateRepartoInsumos,
	setCurrentRepartoInsumos,
	setHistorialMadre,
} = madreInsumosSlice.actions;
