import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { logoutUser } from "@/store/slices/auth/thunks";
import { Toast } from "primereact/toast";
import logo from "@/assets/PVL.png";
import style from "./LoginHeader.module.css";

import { useAppDispatch } from "@/store/hooks";

export const LoginHeader = ({ title = "", actionButton = false }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useRef(null);
	const [menuActive, setMenuActive] = useState(false);

	const handleNavigate = (path: string) => {
		navigate(`/${path}`);
		setMenuActive(false);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<header className={style.loginHeader__container}>
			<Toast ref={toast} />
			<div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
				<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
					<div className={style.logo__container} onClick={() => navigate("/")}>
						<img src={logo} alt="logo" className={style.logo__item} />
					</div>
				</div>
			</div>

			{/* <div className={style.loginHeader__information}>

			</div> */}

		</header>
	);
};
