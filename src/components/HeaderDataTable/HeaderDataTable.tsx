import React from "react";
import style from "./HeaderDataTable.module.css";

import { MdCreate } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";

interface HeaderDataTableProps {
	onCreate?: any;
	onExport?: any;
}

export const HeaderDataTable = ({ onCreate, onExport }: HeaderDataTableProps) => {
	return (
		<div className={style.header__container}>
			<div className={style.buttonsLeft__container}>
				{onCreate ? (
					<button className={`${style.button__create} ${style.button}`} onClick={onCreate}>
						<MdCreate fill="#fff" />
						Nuevo
					</button>
				) : null}

				{onExport ? (
					<button className={`${style.button__export} ${style.button}`} onClick={onExport}>
						<RiFileExcel2Line fill="#fff" />
						Exportar
					</button>
				) : null}
			</div>
		</div>
	);
};
