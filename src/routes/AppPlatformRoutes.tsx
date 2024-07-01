import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import style from "./AppRoutes.module.css";

import { AppStructure } from "../components/AppStructure/AppStructure";

import { Perfil } from "@/features/plataforma/Perfil/Perfil";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { RecojoLeche } from "@/features/plataforma/RecojoLeche/RecojoLeche";
import { Coordinadora } from "@/features/plataforma/Coordinadora/Coordinadora";
import { Recepcion } from "@/features/plataforma/Recepcion/Recepcion";
import { Acopio } from "@/features/plataforma/jefe/Acopio/Acopio";
import { Distribucion } from "@/features/plataforma/jefe/Distribucion/Distribucion";
import { DashboardJefe } from "@/features/plataforma/jefe/DashboardJefe/DashboardJefe";
import { DashboardCoordinadora } from "@/features/plataforma/DashboardCoordinadora/DashboardCoordinadora";

export const AppPlatformRoutes = ({ role }: any) => {
	return (
		<AppStructure>
			<Sidebar role={role} />
			<div className={style.mainContent__container}>
				<Routes>
					<Route path="/" element={<div></div>} />
					{role === "jefe" && (
						<>
							<Route path="/acopio" element={<Acopio />} />
							<Route path="/distribucion" element={<Distribucion />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/dashboard/jefe" element={<DashboardJefe />} />

							<Route path="/*" element={<Navigate to="/plataforma" />} />
						</>
					)}
					{role === "coordinadora" && (
						<>
							<Route path="/coordinadora" element={<Coordinadora />} />
							<Route path="/recepcion" element={<Recepcion />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/dashboard/coordinadora" element={<DashboardCoordinadora />} />

							<Route path="/*" element={<Navigate to="/plataforma" />} />
						</>
					)}
					{role === "madre" && (
						<>
							<Route path="/recojo-leche" element={<RecojoLeche />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/*" element={<Navigate to="/plataforma" />} />
						</>
					)}
				</Routes>
			</div>
		</AppStructure>
	);
};
