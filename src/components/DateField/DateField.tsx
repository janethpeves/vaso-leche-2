import React from "react";
import style from "./DateField.module.css";

import { Calendar } from "primereact/calendar";

interface Props {
	textLabel?: string;
	type?: "normal" | "mes";
	direction?: "row" | "column";
	value?: any;
	onChange?: any;
}

export const DateField = ({
	textLabel,
	type = "normal",
	direction = "column",
	value,
	onChange,
}: Props) => {
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
		>
			<label style={{ fontSize: "13px" }}>{textLabel}</label>
			{type === "normal" && (
				<Calendar
					style={{ height: "30px" }}
					value={value}
					onChange={onChange}
					showIcon
					dateFormat="dd/mm/yy"
				/>
			)}
			{type === "mes" && (
				<Calendar
					style={{ height: "30px" }}
					value={value}
					onChange={onChange}
					view="month"
					dateFormat="dd/mm/yy"
					showIcon
				/>
			)}
		</div>
	);
};
