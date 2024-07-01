import React, { useEffect, useState } from "react";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { DateField } from "@/components/DateField/DateField";
import { Button } from "primereact/button";
import {
	cambiarEstado,
	crearDistribucion,
	obtenerDistribucion,
} from "@/store/slices/insumos/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatDate } from "@/helpers/getCurrentDate";

// import { handleChangeInput } from "@/helpers/handleTextBox";

export const Distribucion = () => {
	const dispatch = useAppDispatch();
	const [dateFilter, setDateFilter] = useState<any>(new Date());
	const currentDistribucion = useAppSelector((state: any) => state.insumos.currentDistribucion);

	const handleCreate = () => {
		dispatch(crearDistribucion());
		let currentDate = formatDate(dateFilter);
		dispatch(obtenerDistribucion(currentDate));
	};

	useEffect(() => {
		if (dateFilter) {
			let currentDate = formatDate(dateFilter);
			dispatch(obtenerDistribucion(currentDate));
		}
	}, [dateFilter]);

	const handleChangeStatus = (rowData: any) => {
		dispatch(cambiarEstado(rowData.id));
	};
	return (
		<>
			<ContentStructure>
				<h3>Distribución - Jefe</h3>
				<hr />
				<br />
				<h2>Lista de coordinadoras</h2>
				<br />
				<div style={{ width: "500px" }}>
					<DateField
						textLabel="Fecha:"
						value={dateFilter}
						onChange={(e: any) => setDateFilter(e.target.value)}
					/>
				</div>
				<br />
				<div>
					<Button onClick={handleCreate}>Nueva distribución</Button>
				</div>

				<br />
				<DataTable
					columns={columns}
					data={currentDistribucion?.coordinadoras || []}
					isHeaderActive={false}
					onUpdate={handleChangeStatus}
				/>
			</ContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "DNI", campo: "docNumber" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Apellidos", campo: "lastname" },
	{ nombre: "Cant. Leche", campo: "totalLeche" },
	{ nombre: "Cant. Cereal", campo: "totalCereal" },
	{ nombre: "Estado", campo: "estado" },
];
