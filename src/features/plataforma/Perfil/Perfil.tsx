import React from "react";
import style from "./Perfil.module.css";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useAppSelector } from "@/store/hooks";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const Perfil = () => {
	const { name, lastname, phone, address, correo, docNumber, childrenAmount } = useAppSelector(
		(state: any) => state.auth.login
	);

	return (
		<ContentStructure>
			<h3>Perfil</h3>
			<hr />
			<br />
			<h2>Tus Datos</h2>

			<div className={style.form__container}>
				<div className={style.form__group}>
					<TextBoxField
						textLabel="Nombre"
						value={name || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					<TextBoxField
						textLabel="Apellidos"
						value={lastname || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					<TextBoxField
						textLabel="Celular"
						value={phone || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					<TextBoxField
						textLabel="Dirección"
						value={address || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					<TextBoxField
						textLabel="Tipo de documento"
						value={"DNI"}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					<TextBoxField
						textLabel="Número de documento"
						value={docNumber || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
					{/* <TextBoxField
						textLabel="Zona"
						value={""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/> */}

					<TextBoxField
						textLabel="Cantidad de hijos"
						value={childrenAmount || ""}
						name="name"
						// onChange={(e) => handleChangeInput(e, setNewData)}
						onChange={() => {}}
					/>
				</div>
				<TextBoxField
					textLabel="Correo Electrónico"
					value={correo || ""}
					name="name"
					// onChange={(e) => handleChangeInput(e, setNewData)}
					onChange={() => {}}
				/>
			</div>
		</ContentStructure>
	);
};
