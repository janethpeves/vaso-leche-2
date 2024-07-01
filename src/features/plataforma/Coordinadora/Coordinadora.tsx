import React, { useEffect, useState } from "react";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { DateField } from "@/components/DateField/DateField";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "primereact/button";
import { formatDate } from "@/helpers/getCurrentDate";
import { cambiarEstado, crearReparto, obtenerReparto } from "@/store/slices/madreInsumos/thunks";

export const Coordinadora = () => {
	const dispatch = useAppDispatch();
	const [dateFilter, setDateFilter] = useState<any>(new Date());
	const auth = useAppSelector((state: any) => state.auth.login);
	const currentReparto = useAppSelector((state: any) => state.madreInsumos.currentRepartoInsumos);

	const handleCreate = () => {
		let currentDate = formatDate(dateFilter);
		dispatch(crearReparto(currentDate, auth?.id));
		dispatch(obtenerReparto(currentDate));
	};

	useEffect(() => {
		if (dateFilter) {
			let currentDate = formatDate(dateFilter);
			dispatch(obtenerReparto(currentDate));
		}
	}, [dateFilter]);

	const handleChangeStatus = (rowData: any) => {
		dispatch(cambiarEstado(rowData.id));
	};

	return (
		<>
			<ContentStructure>
				<h3>Reparto de insumos - Coordinadora</h3>
				<hr />
				<br />
				<h2>Lista de madres de familia</h2>
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
					<Button onClick={handleCreate}>Nuevo reparto</Button>
				</div>

				<br />
				<DataTable
					columns={columns}
					data={currentReparto?.madres || []}
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
