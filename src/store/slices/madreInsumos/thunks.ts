import { AppThunk } from "../../store";

import { selectUsers } from "../auth/selectors";
import {
	setCurrentRepartoInsumos,
	setHistorialMadre,
	setRepartoInsumos,
	updateRepartoInsumos,
} from "./madreInsumosSlice";
import { selectAuth, selectCurrentRepartos, selectRepartos } from "./selectors";

export const crearReparto = (payload: any, id: any): AppThunk => {
	// payload devuelve la fecha con formato, ya desde la invocacion de la accion
	return async (dispatch, getState) => {
		try {
			const users = selectUsers(getState());
			const auth: any = selectAuth(getState());

			let madres = users.filter((user: any) => user.role == "madre" && user.coordinadora == id);

			let fullDataMadre = madres.map((madre: any) => {
				return {
					...madre,
					totalLeche: +madre.childrenAmount,
					totalCereal: +madre.childrenAmount,
					estado: "NO RECIBIDO",
					date: payload,
				};
			});

			let result = {
				date: payload,
				coordinadora: auth?.id,
				madres: [...fullDataMadre],
			};

			dispatch(setRepartoInsumos(result));
		} catch (error) {
			console.log(error);
		}
	};
};

export const obtenerReparto = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const repartoList = selectRepartos(getState());
			const auth: any = selectAuth(getState());

			let result = repartoList.find(
				(distribucion: any) => distribucion.date == payload && distribucion.coordinadora == auth.id
			);
			console.log(result);

			if (result) {
				dispatch(setCurrentRepartoInsumos(result));
			} else {
				dispatch(setCurrentRepartoInsumos({}));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const cambiarEstado = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const currentReparto = selectCurrentRepartos(getState());
			const repartoList = selectRepartos(getState());

			if (!currentReparto || !currentReparto.madres) {
				throw new Error("Distribución actual no encontrada o coordinadoras no definidas");
			}

			const updatedMadres = currentReparto.madres.map((madre: any) => {
				if (madre.id === payload) {
					return {
						...madre,
						estado: "PENDIENTE",
					};
				}
				return madre;
			});

			const finalResult = {
				...currentReparto,
				madres: updatedMadres,
			};

			dispatch(setCurrentRepartoInsumos(finalResult));

			// Actualizar el registro general de distribuciones
			const newRegistroDistribucion = repartoList.map((reparto: any) => {
				if (reparto.id === currentReparto.id) {
					return finalResult;
				}
				return reparto;
			});

			dispatch(updateRepartoInsumos(newRegistroDistribucion));
		} catch (error) {
			console.log(error);
		}
	};
};

export const completarRecibido = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const currentReparto = selectCurrentRepartos(getState());
			const repartoList = selectRepartos(getState());

			if (!currentReparto || !currentReparto.madres) {
				throw new Error("Distribución actual no encontrada o coordinadoras no definidas");
			}

			const updatedMadres = currentReparto.madres.map((madre: any) => {
				if (madre.id === payload) {
					return {
						...madre,
						estado: "RECIBIDO",
					};
				}
				return madre;
			});

			const finalResult = {
				...currentReparto,
				madres: updatedMadres,
			};

			dispatch(setCurrentRepartoInsumos(finalResult));

			// Actualizar el registro general de distribuciones
			const newRegistroDistribucion = repartoList.map((reparto: any) => {
				if (reparto.id === currentReparto.id) {
					return finalResult;
				}
				return reparto;
			});

			dispatch(updateRepartoInsumos(newRegistroDistribucion));
			dispatch(obtenerHistorialMadre(payload));
		} catch (error) {
			console.log(error);
		}
	};
};

export const obtenerHistorialMadre = (payload: number): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const repartoList = selectRepartos(getState());

			let result: any = [];

			repartoList.forEach((item: any) => {
				item.madres.forEach((madre: any) => {
					if (madre.id === payload) {
						result.push(madre);
					}
				});
			});

			dispatch(setHistorialMadre(result));
		} catch (error) {
			console.log(error);
		}
	};
};
