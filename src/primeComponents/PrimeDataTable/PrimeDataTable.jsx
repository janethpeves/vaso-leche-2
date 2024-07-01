import { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { MdBlock, MdModeEditOutline } from "react-icons/md";

import style from "./PrimeDataTable.module.css";

export const PrimeDataTable = ({ columns, data, onUpdate, onDelete, onEye, dataKey }) => {
	const [dataTable, setDataTable] = useState(data);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	const buttonSuccess = (rowData) => {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: "0", margin: "0" }}>
				<Button
					className="p-button-info p-button-rounded"
					style={{ width: "20px", height: "20px", padding: "0", margin: "5px" }}
					type="button"
					// icon="pi pi-pencil"
					icon={<MdModeEditOutline size={10} />}
					onClick={() => onUpdate(rowData)}
				/>
			</div>
		);
	};

	const buttonDecline = (rowData) => {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: "0", margin: "0" }}>
				<Button
					className="p-button-danger p-button-rounded"
					style={{ width: "20px", height: "20px", padding: "0", margin: "5px" }}
					type="button"
					// icon="pi pi-ban"
					icon={<MdBlock size={16} />}
					onClick={() => {
						onDelete(rowData);
					}}
				/>
			</div>
		);
	};

	const buttonEye = (rowData) => {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: "0", margin: "0" }}>
				<Button
					className="p-button-help p-button-rounded"
					style={{ width: "20px", height: "20px", padding: "0", margin: "5px" }}
					type="button"
					icon="pi pi-eye"
					onClick={() => {
						onEye(rowData);
					}}
				/>
			</div>
		);
	};

	return (
		<>
			<DataTable
				value={dataTable}
				paginator
				rows={10}
				dataKey={dataKey}
				size="small"
				showGridlines
				emptyMessage="No se han encontrado resultados."
			>
				{columns &&
					columns.map((column) => (
						<Column
							key={`${column.campo}`}
							field={column.campo}
							body={column.body}
							header={column.nombre}
							headerStyle={{
								background: "var(--primary-color-app)",
								color: "#fff",
							}}
							bodyStyle={{
								fontSize: "13px",
								fontWeight: "600",

								margin: "0",
								textTransform: "uppercase",
							}}
							style={{
								width: column.widthColumn && column.widthColumn,
								minWidth: "50px",
								fontSize: "13px",
							}}
							className={style.column__primeDataTable}
						/>
					))}

				{/* Botones para verificar transacciones */}
				{onUpdate && (
					<Column
						style={{ width: "40px", margin: "0", padding: "0" }}
						headerStyle={{
							background: "var(--primary-color-app)",
							color: "#fff",
						}}
						body={buttonSuccess}
					/>
				)}
				{onEye && (
					<Column
						style={{ width: "40px", margin: "0", padding: "0" }}
						headerStyle={{
							background: "var(--primary-color-app)",
							color: "#fff",
						}}
						body={buttonEye}
					/>
				)}
				{onDelete && (
					<Column
						style={{ width: "40px", margin: "0", padding: "0" }}
						headerStyle={{
							background: "var(--primary-color-app)",
							color: "#fff",
						}}
						body={buttonDecline}
					/>
				)}
			</DataTable>
		</>
	);
};
