import React, { useEffect, useState } from "react";
import style from "./RecojoLeche.module.css";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { DataTable } from "@/components/DataTable/DataTable";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { completarRecibido, obtenerHistorialMadre } from "@/store/slices/madreInsumos/thunks";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const RecojoLeche = () => {
	const recibirModal = useModal();
	const dispatch = useAppDispatch();
	const auth = useAppSelector((state: any) => state.auth.login);
	const historialRecojo = useAppSelector((state) => state.madreInsumos.historialMadre);

	const [count, setCount] = useState(0);

	useEffect(() => {
		dispatch(obtenerHistorialMadre(auth?.id));
	}, []);

	useEffect(() => {
		if (historialRecojo) {
			setCount(historialRecojo.length || null);
		}
	}, [historialRecojo]);

	const aceptarRecojo = () => {
		dispatch(completarRecibido(auth?.id));
		recibirModal.onHideModal();
	};

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
					data={historialRecojo || []}
					isHeaderActive={false}
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
						<b>Cantidad de leche:</b> {historialRecojo[count - 1]?.totalLeche}
					</p>
					<p>
						<b>Cantidad de cereal:</b> {historialRecojo[count - 1]?.totalCereal}
					</p>
				</div>
				<div style={{ display: "flex", gap: "20px" }}>
					<button className={style.modal__button__confirm} onClick={aceptarRecojo}>
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
	{ nombre: "Fecha", campo: "date" },
	{ nombre: "Cant. Leche", campo: "totalLeche" },
	{ nombre: "Cant. Cereal", campo: "totalCereal" },
	{ nombre: "Estado", campo: "estado" },
];
