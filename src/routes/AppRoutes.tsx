import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "@/features/Login/Login";
import { Register } from "@/features/Register/Register";
import { AppPlatformRoutes } from "./AppPlatformRoutes";
import { useAppSelector } from "@/store/hooks";

export function AppRoutes() {
	const auth: any = useAppSelector((state) => state.auth.login);
	// const auth = { role: "jefe" };
	return (
		<BrowserRouter>
			<Routes>
				{!auth?.role ? (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/registro" element={<Register />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</>
				) : (
					<>
						<Route path="/plataforma/*" element={<AppPlatformRoutes role={auth?.role} />} />
						<Route path="/*" element={<Navigate to="/plataforma" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}
