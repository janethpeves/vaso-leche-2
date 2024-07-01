import React from "react";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

interface DataTableProps {
	isHeaderActive?: any;
	columns: any;
	data: any;

	// textAddButton?: any;
	onCreate?: any;
	onUpdate?: any;
	onDelete?: any;
	onEye?: any;
	onExport?: any;

	children?: React.ReactNode;
	dataKey?: any;
}

export const DataTable = ({
	isHeaderActive = true,
	columns,
	data,

	onCreate,
	onUpdate,
	onDelete,
	onEye,

	onExport,

	children,
	dataKey,
}: DataTableProps) => {
	return (
		<>
			{isHeaderActive ? <HeaderDataTable onExport={onExport} onCreate={onCreate} /> : null}
			{/* Tabla */}
			<PrimeDataTable
				columns={columns}
				data={data}
				onUpdate={onUpdate}
				onDelete={onDelete}
				onEye={onEye}
				dataKey={dataKey}
			/>

			{children ? <div>{children}</div> : null}
		</>
	);
};
