import React, { ChangeEvent } from "react";
import style from "./TextBoxField.module.css";
import { InputText } from "primereact/inputtext";

interface TextBoxFieldProps {
	textLabel?: string;
	value: string | undefined;
	name: string;
	type?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	onBlur?: any;
	containerStyle?: React.CSSProperties;
	labelWrap?: string;
}

export const TextBoxField = ({
	textLabel,
	value,
	name,
	type = "text",
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
	onBlur,
	containerStyle,
	labelWrap,
}: TextBoxFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "12px",
		whiteSpace: labelWrap,
	};

	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
			style={containerStyle}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputText
				className="p-inputtext-sm"
				value={value}
				// value={value?.toLocaleUpperCase()}
				name={name}
				type={type}
				onChange={onChange}
				autoComplete="off"
				disabled={disabled}
				onBlur={onBlur}
				style={{ width: "100%", height: "40px" }}
			/>
		</div>
	);
};
