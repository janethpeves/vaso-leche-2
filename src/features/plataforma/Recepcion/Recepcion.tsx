import React from "react";

import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { useModal } from "@/hooks/useModal";

import { useAppSelector } from "@/store/hooks";
import { getDistribucionesPorCoordinadora } from "@/helpers/generalFunctions";
// import { handleChangeInput } from "@/helpers/handleTextBox";

export const Recepcion = () => {
	const recibirModal = useModal();
	const auth: any = useAppSelector((state) => state.auth.login);

	let recepciones = getDistribucionesPorCoordinadora(auth?.id);

	return (
		<>
			<ContentStructure>
				<h3>Recepción de insumos - coordinadora</h3>
				<hr />
				<br />
				<h2>Historial de recepción</h2>

				<br />
				<DataTable columns={columns} data={recepciones || []} isHeaderActive={false} />
			</ContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "Cód.", campo: "id" },
	{ nombre: "Fecha", campo: "date" },
	{ nombre: "Cant. total de leche", campo: "totalLeche" },
	{ nombre: "Cant. total de cereal", campo: "totalCereal" },
	{ nombre: "Estado", campo: "estado" },
];
