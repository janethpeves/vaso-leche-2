import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { toastSlice } from "./slices/toast";
import { insumosSlice } from "./slices/insumos/insumosSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		toast: toastSlice.reducer,
		insumos: insumosSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
