import { useAppSelector } from "@/store/hooks";

export const getCoordinadora = () => {
	const users = useAppSelector((state) => state.auth.users);
	return users.filter((user: any) => user.role == "coordinadora");
};

export const getMadresPorCoordinadora = (idCoordinadora: any) => {
	const users = useAppSelector((state) => state.auth.users);
	return users.filter((user: any) => user.coordinadora == idCoordinadora);
};
