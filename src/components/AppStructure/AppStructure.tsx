import React from "react";
import style from "./AppStructure.module.css";

interface Props {
	children: React.ReactNode;
}

export const AppStructure = ({ children }: Props) => {
	return <div className={style.appStructure__container}>{children}</div>;
};
