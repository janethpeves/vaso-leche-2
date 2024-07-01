import React, { useState } from "react";
import style from "./Login.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
// import { Footer } from "@/components/Footer/Footer";
import Logo from "@/assets/PVL.png";
import Fondo from "@/assets/img_login.png";
import { useAppDispatch } from "@/store/hooks";

import { LoginHeader } from "./components/LoginHeader/LoginHeader";
import { getUser } from "@/store/slices/auth";

export const Login = () => {
	const dispatch = useAppDispatch();

	const [user, setUser] = useState({
		correo: "",
		password: "",
	});

	const onLogin = async (user: any) => {
		dispatch(getUser(user));
	};

	const handleChangeInput = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	// --Steps
	const [step, setStep] = useState(1);
	const handleNextStep = () => {
		setStep(step + 1);
	};

	return (
		<>
			<LoginHeader />
			<div className={style.login__container}>
				<div>
					<img style={{ width: "100%", height: "86vh", objectFit: "cover" }} src={Fondo} alt="" />
				</div>

				<section className={style.form__section}>
					<div className={style.form__container}>
						<div className={style.logo__container}>
							<img className={style.logo__item} src={Logo} alt="logo" />
						</div>
						<h2>Iniciar Sesión</h2>
					</div>
					<div className={style.form}>
						<TextBoxField
							textLabel="Correo:"
							value={user.correo}
							name={"correo"}
							onChange={handleChangeInput}
						/>
						<TextBoxField
							textLabel="Contraseña:"
							value={user.password}
							name={"password"}
							onChange={handleChangeInput}
							type="password"
						/>
						<div className={style.from__text__recoveryPassword}>
							<p style={{ fontSize: "14px", color: "f9f9f9" }}>¿Olvidaste tu contraseña?</p>
						</div>
						<CustomButton
							text="Iniciar sesión"
							backgroundButton="var(--primary-color-app)"
							colorP="#fff"
							onClick={() => onLogin(user)}
						/>
						<div className={style.from__text__register}>
							<p style={{ fontSize: "14px", color: "f9f9f9" }}>
								¿No tienes una cuenta?{" "}
								<Link
									to="/registro"
									style={{
										color: "var(--primary-color-app)",
										fontWeight: "600",
									}}
								>
									Registrate aquí
								</Link>
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
