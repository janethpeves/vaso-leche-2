import React from "react";
import style from "./SelectField.module.css";

import { Dropdown } from "primereact/dropdown";

interface SelectFieldProps {
	textLabel?: string;
	value: string | undefined | number;

	name: string;
	placeholder?: string;
	optionLabel?: string;
	optionValue?: string;
	onChange: (e: any) => void;
	options: any[];
	direction?: "row" | "column";
	labelWidth?: string;
	disabled?: boolean;
	onBlur?: any;
}

export const SelectField = ({
	textLabel,
	value,
	name,
	placeholder = "Seleccione una opción",
	optionLabel = "name",
	optionValue = "value",
	onChange,
	options,
	direction = "column",
	labelWidth = "100%",
	onBlur,
	disabled = false,
}: SelectFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "12px",
		color: "#333",
	};

	return (
		<div className={`${direction == "column" ? style.column__item : style.row__item}`}>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<Dropdown
				style={{height:"40px"}}
				value={value}
				name={name}
				onChange={onChange}
				options={options}
				disabled={disabled}
				optionLabel={optionLabel}
				optionValue={optionValue}
				placeholder={placeholder}
				onBlur={onBlur}
				emptyMessage={<p className={style.emptyMessage__text}>No hay resultados.</p>}
			/>
		</div>
	);
};
