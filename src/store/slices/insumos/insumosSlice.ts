import { createSlice } from "@reduxjs/toolkit";

export interface InsumosState {
	isLoading: boolean;
	insumosGenerales: any;
	registroDistribucion: any;
	currentDistribucion: any;
	dashboardJefe: any;
	dashboardCoordinadora: any;
}

const initialState: InsumosState = {
	isLoading: true,
	insumosGenerales: [],
	registroDistribucion: [],
	currentDistribucion: {},
	dashboardJefe: {},
	dashboardCoordinadora: {},
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
		updateRegistroDistribucion: (state, action) => {
			state.registroDistribucion = action.payload;
		},
		setCurrentDistribucion: (state, action) => {
			state.currentDistribucion = action.payload;
		},
		setDashboardJefe: (state, action) => {
			state.dashboardJefe = action.payload;
		},
		setDashboardCoordinadora: (state, action) => {
			state.dashboardCoordinadora = action.payload;
		},
	},
});

export const {
	isLoading,
	addInsumosGenerales,
	setRegistroDistribucion,
	setCurrentDistribucion,
	updateRegistroDistribucion,
	setDashboardJefe,
	setDashboardCoordinadora,
} = insumosSlice.actions;
