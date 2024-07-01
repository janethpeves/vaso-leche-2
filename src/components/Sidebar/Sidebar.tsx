import React from "react";
import style from "./Sidebar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaTable } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";

export const Sidebar = ({ role }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};
	return (
		<div className={style.sidebar__container}>
			<div>
				<h1 className={style.sidebar__title}>VASO DE LECHE</h1>
			</div>

			{role === "jefe" && (
				<ul className={style.sidebar__nav}>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/dashboard/jefe")}>
						<GoHomeFill />
						DASHBOARD
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/acopio")}>
						<FaTable />
						ACOPIO
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/distribucion")}>
						<FaTable />
						DISTRIBUCIÓN
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/perfil")}>
						<MdPerson size={18} />
						MI PERFIL
					</li>
				</ul>
			)}

			{role === "coordinadora" && (
				<ul className={style.sidebar__nav}>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/dashboard/coordinadora")}>
						<GoHomeFill />
						DASHBOARD
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/recepcion")}>
						<FaTable />
						RECEPCIÓN
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/coordinadora")}>
						<FaTable />
						COORDINADORA
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/perfil")}>
						<MdPerson size={18} />
						MI PERFIL
					</li>
				</ul>
			)}

			{role === "madre" && (
				<ul className={style.sidebar__nav}>
		
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/recojo-leche")}>
						<FaTable />
						RECOJO DE LECHE
					</li>
					<li className={style.sidebar__item} onClick={() => navigate("/plataforma/perfil")}>
						<MdPerson size={18} />
						MI PERFIL
					</li>
				</ul>
			)}

			<div>
				<button className={style.sideber__logout} onClick={logout}>
					SALIR
				</button>
			</div>
		</div>
	);
};
