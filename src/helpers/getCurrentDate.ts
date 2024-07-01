export const getCurrentDate = () => {
	const date = new Date();
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};

export const formatDate = (date: any) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};
