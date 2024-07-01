import React from "react";
import style from "./Recepcion.module.css";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { DataTable } from "@/components/DataTable/DataTable";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { DateField } from "@/components/DateField/DateField";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const Recepcion = () => {
	const recibirModal = useModal();
	return (
		<>
			<ContentStructure>
				<h3>Recepción de insumos</h3>
				<hr />
				<br />
				<h2>Historial de recepción</h2>
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

			{/* Add Modal */}
			<PrimeModal
				header="¿Estas recibiendo la cantidad indicada?"
				modalStatus={recibirModal.modalStatus}
				onHideModal={recibirModal.onHideModal}
				width={650}
			>
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						gap: "20px",
						textAlign: "center",
						justifyContent: "center",
					}}
				>
					<p>
						<b>Cantidad de leche:</b> 3
					</p>
					<p>
						<b>Cantidad de cereal:</b> 1
					</p>
				</div>
				<div style={{ display: "flex", gap: "20px" }}>
					<button
						className={style.modal__button__confirm}
						onClick={() => recibirModal.onHideModal()}
					>
						SI
					</button>
					<button
						className={style.modal__button__confirm}
						onClick={() => recibirModal.onHideModal()}
					>
						NO
					</button>
				</div>
				{/* <AddModal postFetchData={postFetchData.postFetchData} onHideModal={addModal.onHideModal} /> */}
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Cód.", campo: "id" },
	{ nombre: "Fecha", campo: "fecha" },
	{ nombre: "Hora", campo: "hora" },
	{ nombre: "Cant. total de leche", campo: "cantleche" },
	{ nombre: "Cant. total de cereal", campo: "cantcereal" },
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
		id: 2,
		fecha: "25-05-24",
		hora: "",
		cantleche: "50",
		cantcereal: "20",
		estado: false,
		obs: "",
	},
	{
		id: 1,
		fecha: "15-05-24",
		hora: "10:30",
		cantleche: "50",
		cantcereal: "20",
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
