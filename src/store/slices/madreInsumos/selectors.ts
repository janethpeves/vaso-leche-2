import { RootState } from "../../store";

export const selectRepartos = (state: RootState) => state.madreInsumos.repartoInsumos;
export const selectCurrentRepartos = (state: RootState) => state.madreInsumos.currentRepartoInsumos;
export const selectAuth = (state: RootState) => state.auth.login;
