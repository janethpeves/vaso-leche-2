import React from "react";
import style from "./CustomButton.module.css";

interface CustomButtonProps {
	icon?: string;
	text: string;
	shortcut?: string;
	backgroundButton?: string;
	height?: string;
	colorP?: string;
	sizeP?: string;
	onClick?: any;
	additionalClassName?: string;
	type?: any;
}

export const CustomButton = ({
	icon,
	text,
	shortcut,
	backgroundButton = "#eceff1",
	height = "auto",
	colorP = "black",
	sizeP,
	additionalClassName,
	onClick,
	type,
}: CustomButtonProps) => {
	const styles: React.CSSProperties = {
		background: backgroundButton,
		height: height,
		color: colorP,
	};
	const stylesP: React.CSSProperties = {
		color: colorP,
		fontSize: sizeP,
	};

	const combinedClassNames = `${style.button__action} ${additionalClassName}`;

	return (
		<button className={combinedClassNames} style={styles} onClick={onClick} type={type}>
			<p className={style.button__text} style={stylesP}>
				{text} {shortcut ? `[${shortcut}]` : null}
			</p>
			{icon && <img src={icon} alt="icono" />}
		</button>
	);
};
