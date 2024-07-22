import { AppThunk } from "../../store";

import {
	isLoading,
	setCurrentDistribucion,
	setRegistroDistribucion,
	updateRegistroDistribucion,
} from "./insumosSlice";
import { selectUsers } from "../auth/selectors";

import { selectCurrentDistribucion, selectDistribucion } from "./selectors";

export const crearDistribucion = (payload: any): AppThunk => {
	// payload devuelve la fecha con formato, ya desde la invocacion de la accion
	return async (dispatch, getState) => {
		try {
			const users = selectUsers(getState());
			const distribucion = selectDistribucion(getState());

			// Validamos si ya hay una distribucion en el día
			let existeDistribucion = distribucion.find((item: any) => item.date == payload);
			if (existeDistribucion) {
				alert("Ya se realizo una distribución en el día indicado");
				return;
			}

			let coordinadoras = users.filter((user: any) => user.role == "coordinadora");
			let madres = users.filter((user: any) => user.role == "madre");

			let fullDataCoordinadoras = coordinadoras.map((coordinadora: any) => {
				let totalLeche = 0;
				let totalCereal = 0;

				madres.map((madre: any) => {
					if (madre.coordinadora == coordinadora.id) {
						totalLeche += +madre.childrenAmount;
						totalCereal += +madre.childrenAmount;
					}
				});

				return {
					...coordinadora,
					totalLeche: totalLeche,
					totalCereal: totalCereal,
					estado: "NO RECIBIDO",
					date: payload,
				};
			});

			let result = { date: payload, coordinadoras: [...fullDataCoordinadoras] };

			dispatch(setRegistroDistribucion(result));
		} catch (error) {
			console.log(error);
		}
	};
};

export const obtenerDistribucion = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const distribucionList = selectDistribucion(getState());
			let result = distribucionList.find((distribucion: any) => distribucion.date == payload);

			if (result) {
				dispatch(setCurrentDistribucion(result));
			} else {
				dispatch(setCurrentDistribucion({}));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const cambiarEstado = (payload: any): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const currentDistribucion = selectCurrentDistribucion(getState());
			const registroDistribucion = selectDistribucion(getState());

			if (!currentDistribucion || !currentDistribucion.coordinadoras) {
				throw new Error("Distribución actual no encontrada o coordinadoras no definidas");
			}

			const updatedCoordinadoras = currentDistribucion.coordinadoras.map((coordinadora: any) => {
				if (coordinadora.id === payload) {
					return {
						...coordinadora,
						estado: "RECIBIDO",
					};
				}
				return coordinadora;
			});

			const finalResult = {
				...currentDistribucion,
				coordinadoras: updatedCoordinadoras,
			};

			dispatch(setCurrentDistribucion(finalResult));

			// Actualizar el registro general de distribuciones
			const newRegistroDistribucion = registroDistribucion.map((distribucion: any) => {
				if (distribucion.id === currentDistribucion.id) {
					return finalResult;
				}
				return distribucion;
			});

			dispatch(updateRegistroDistribucion(newRegistroDistribucion));
		} catch (error) {
			console.log(error);
		}
	};
};

export const dataJefeDashboard = (): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const registroDistribucion = selectDistribucion(getState());

			console.log(registroDistribucion);
			// dispatch(setCurrentDistribucion(finalResult));
		} catch (error) {
			console.log(error);
		}
	};
};
