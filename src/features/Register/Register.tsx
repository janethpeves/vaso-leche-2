import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { SelectField } from "@/components/SelectField/SelectField";
import Fondo from "@/assets/img_login.png";

import { useAppDispatch } from "@/store/hooks";
import { createUser } from "@/store/slices/auth";
import { getCoordinadora } from "@/helpers/generalFunctions";

export const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	let coordinadoraList = getCoordinadora();
	const [newUser, setNewUser] = useState({
		correo: "",
		password: "",
		name: "",
		role: "",
		lastname: "",
		phone: "",
		address: "",
		docNumber: "",
		childrenAmount: "",
		coordinadora: "",
	});

	const onCreateUser = async (newUser: any) => {
		dispatch(createUser(newUser));
		navigate("/login");
	};

	const handleChangeInput = (e: any) => {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={style.register__container}>
			<div>
				<img style={{ width: "100%", height: "100vh", objectFit: "cover" }} src={Fondo} alt="" />
			</div>

			<section className={style.form__section}>
				<div className={style.form__container}>
					<h2>Registrarse</h2>
				</div>
				<div className={style.form}>
					<TextBoxField
						textLabel="Nombre:"
						value={newUser.name}
						name="name"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Apellido:"
						value={newUser.lastname}
						name="lastname"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Nro. de Documento:"
						value={newUser.docNumber}
						name="docNumber"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Celular:"
						value={newUser.phone}
						name="phone"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Dirección:"
						value={newUser.address}
						name="address"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Cantidad de Hijos:"
						value={newUser.childrenAmount}
						name="childrenAmount"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Correo:"
						value={newUser.correo}
						name="correo"
						onChange={handleChangeInput}
					/>
					<TextBoxField
						textLabel="Contraseña:"
						type="password"
						value={newUser.password}
						name="password"
						onChange={handleChangeInput}
					/>
					<SelectField
						textLabel="Cargo:"
						value={newUser.role}
						name="role"
						onChange={handleChangeInput}
						options={[
							{ id: 1, name: "Coordinadora", value: "coordinadora" },
							{ id: 2, name: "Madre de Familia", value: "madre" },
						]}
					/>
					<SelectField
						textLabel="Coordinador:"
						value={newUser.coordinadora}
						name="coordinadora"
						onChange={handleChangeInput}
						optionValue="id"
						optionLabel="name"
						options={coordinadoraList}
					/>
				</div>
				<CustomButton
					text="Registrarse"
					backgroundButton="var(--primary-color-app)"
					colorP="#fff"
					onClick={() => onCreateUser(newUser)}
				/>
				<div className={style.from__text__register}>
					<p style={{ fontSize: "14px", color: "f9f9f9" }}>
						¿Ya tienes una cuenta?{" "}
						<Link
							to="/login"
							style={{
								color: "var(--primary-color-app)",
								fontWeight: "600",
							}}
						>
							Inicia sesión aquí
						</Link>
					</p>
				</div>
			</section>
		</div>
	);
};
