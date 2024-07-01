import React from "react";

import { ContentStructure } from "@/components/ContentStructure/ContentStructure";

import { DataTable } from "@/components/DataTable/DataTable";

import { DateField } from "@/components/DateField/DateField";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const Coordinadora = () => {
	return (
		<>
			<ContentStructure>
				<h3>Coordinadora</h3>
				<hr />
				<br />
				<h2>Lista de madres de familia</h2>
				<br />
				<div style={{ width: "500px" }}>
					<DateField textLabel="Fecha:" />
				</div>

				<br />
				<DataTable
					columns={columns}
					// data={getFetchData?.data || []}
					data={data}
					isHeaderActive={false}
					onUpdate={() => {}}
					// onDelete={onDeleteRow}
					dataKey={"condcitacod"}
				/>
			</ContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "DNI", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Apellido Materno", campo: "lastname" },
	{ nombre: "Apellido Paterno", campo: "secondlastname" },
	{ nombre: "Cant. Leche", campo: "cantleche" },
	{ nombre: "Cant. Cereal", campo: "cantcereal" },
	{
		nombre: "Estado",
		body: (rowData: any) => {
			return <p>{rowData.estado == "1" ? "Recibido" : "No recibido"}</p>;
		},
	},
	{ nombre: "Obs", campo: "observacion" },
];

const data = [
	{
		id: 11111111,
		name: "Victoria",
		lastname: "Rodriguez",
		secondlastname: "Dominguez",
		cantleche: "3",
		cantcereal: "1",
		estado: false,
		obs: "",
	},
	{
		id: 11111112,
		name: "Janeth",
		lastname: "Peves",
		secondlastname: "Ramirez",
		cantleche: "3",
		cantcereal: "1",
		estado: true,
		obs: "",
	},
];

// const currentCollection = {
//   pendiente: false,
//   date: "20-05-24",
//   collection: {
//     leche: 0,
//     cereal: 0,
//   }
// }

// const currentCollection = {
//   pendiente: true,
//   date: "20-05-24",
//   collection: {
//     leche: 3,
//     cereal: 1,
//   }
// }
