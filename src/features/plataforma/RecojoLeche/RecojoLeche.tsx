import React from "react";
import style from "./RecojoLeche.module.css";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { DataTable } from "@/components/DataTable/DataTable";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const RecojoLeche = () => {
	const recibirModal = useModal();
	return (
		<>
			<ContentStructure>
				<h3>Recojo de leche</h3>
				<hr />
				<br />
				<h2>Tus recojo semanal</h2>

				<div className={style.recojo__form}>
					<button className={style.perfil__button} onClick={() => recibirModal.onVisibleModal()}>
						RECIBIR LECHE
					</button>
				</div>

				<hr />
				<br />
				<h2>Tus historial de recojo</h2>
				<br />
				<DataTable
					columns={columns}
					// data={getFetchData?.data || []}
					data={data}
					isHeaderActive={false}
					// onCreate={addModal.onVisibleModal}
					// onExport={onPostExcel}
					// onUpdate={onUpdateRow}
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
				<div style={{ marginBottom: "20px", display: "flex", gap: "20px", textAlign: "center", justifyContent: "center" }}>
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
		id: 2,
		fecha: "24-05-24",
		hora: "10:30",
		cantleche: "3",
		cantcereal: "1",
		estado: false,
		obs: "",
	},
	{
		id: 1,
		fecha: "14-05-24",
		hora: "16:30",
		cantleche: "3",
		cantcereal: "1",
		estado: true,
		obs: "",
	},
];

// const currentCollection = {
//   active: false,
//   collection: {
//     leche: 0,
//     cereal: 0,
//   }
// }

// const currentCollection = {
//   active: true,
//   collection: {
//     leche: 3,
//     cereal: 1,
//   }
// }
