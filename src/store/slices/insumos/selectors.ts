import { RootState } from "../../store";

export const selectDistribucion = (state: RootState) => state.insumos.registroDistribucion;
export const selectCurrentDistribucion = (state: RootState) => state.insumos.currentDistribucion;
