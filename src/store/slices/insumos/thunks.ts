import { AppThunk } from "../../store";

import { isLoading, setCurrentDistribucion, setRegistroDistribucion } from "./insumosSlice";
import { selectUsers } from "../auth/selectors";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import { selectCurrentDistribucion, selectDistribucion } from "./selectors";

export const crearDistribucion = (): AppThunk => {
	return async (dispatch, getState) => {
		try {
			const users = selectUsers(getState());
			let currentDate = getCurrentDate();
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
				};
			});

			let result = { date: currentDate, coordinadoras: [...fullDataCoordinadoras] };

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
			console.log(payload);

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
		} catch (error) {
			console.log(error);
		}
	};
};
