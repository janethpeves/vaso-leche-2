import React, { useState } from "react";
import style from "./Acopio.module.css";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { DataTable } from "@/components/DataTable/DataTable";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { DateField } from "@/components/DateField/DateField";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { addInsumosGenerales } from "@/store/slices/insumos";
import { getCurrentDate } from "@/helpers/getCurrentDate";

export const Acopio = () => {
	const dispatch = useAppDispatch();
	const administrarModal = useModal();
	const insumos = useAppSelector((state) => state.insumos.insumosGenerales);

	const [nuevosInsumos, setNuevosInsumos] = useState({
		fecha: getCurrentDate(),
		cantidadLeche: "",
		cantidadCereal: "",
		cantidadBeneficiarios: "",
	});

	const handleCreateInsumos = () => {
		dispatch(addInsumosGenerales(nuevosInsumos));
		administrarModal.onHideModal();
		// Limpiando el estado
		setNuevosInsumos({
			fecha: "",
			cantidadLeche: "",
			cantidadCereal: "",
			cantidadBeneficiarios: "",
		});
	};

	return (
		<>
			<ContentStructure>
				<h3>Recepción de insumos - Jefe</h3>
				<hr />
				<br />
				<div>
					<Button onClick={() => administrarModal.onVisibleModal()}>Registrar recepción</Button>
				</div>
				<br />
				<DataTable columns={columns} data={insumos || []} isHeaderActive={false} onUpdate={false} />
			</ContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Registrar recipción"
				modalStatus={administrarModal.modalStatus}
				onHideModal={administrarModal.onHideModal}
				width={650}
			>
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						flexDirection: "column",
						gap: "20px",
						textAlign: "center",
						justifyContent: "center",
					}}
				>
					<TextBoxField
						textLabel="Fecha de recepción:"
						value={nuevosInsumos.fecha}
						name="fecha"
						onChange={(e) => handleChangeInput(e, setNuevosInsumos)}
						direction="row"
						disabled
					/>
					<TextBoxField
						textLabel="Cantidad de leche:"
						value={nuevosInsumos.cantidadLeche}
						name="cantidadLeche"
						onChange={(e) => handleChangeInput(e, setNuevosInsumos)}
						direction="row"
					/>
					<TextBoxField
						textLabel="Cantidad de cereal:"
						value={nuevosInsumos.cantidadCereal}
						name="cantidadCereal"
						onChange={(e) => handleChangeInput(e, setNuevosInsumos)}
						direction="row"
					/>
					<TextBoxField
						textLabel="Cantidad de beneficiarios:"
						value={nuevosInsumos.cantidadBeneficiarios}
						name="cantidadBeneficiarios"
						onChange={(e) => handleChangeInput(e, setNuevosInsumos)}
						direction="row"
					/>
				</div>

				<Button onClick={handleCreateInsumos}>Guardar</Button>
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Fecha", campo: "fecha" },
	{ nombre: "Cant. total de leche", campo: "cantidadLeche" },
	{ nombre: "Cant. total de cereal", campo: "cantidadCereal" },
	{ nombre: "Cant. total de beneficiarios", campo: "cantidadBeneficiarios" },
];
