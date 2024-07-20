import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { toastSlice } from "./slices/toast";
import { insumosSlice } from "./slices/insumos/insumosSlice";
import { madreInsumosSlice } from "./slices/madreInsumos";
import storage from "redux-persist/lib/storage"; // puedes cambiar el almacenamiento si es necesario
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Configura los persist config para cada slice que quieres persistir
const authPersistConfig = {
	key: "auth",
	storage,
};

const toastPersistConfig = {
	key: "toast",
	storage,
};

const insumosPersistConfig = {
	key: "insumos",
	storage,
};

const madreInsumosPersistConfig = {
	key: "madreInsumos",
	storage,
};

// Envuelve los reducers con persistReducer
const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authSlice.reducer),
	toast: persistReducer(toastPersistConfig, toastSlice.reducer),
	insumos: persistReducer(insumosPersistConfig, insumosSlice.reducer),
	madreInsumos: persistReducer(madreInsumosPersistConfig, madreInsumosSlice.reducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
