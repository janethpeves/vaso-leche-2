import { useAppSelector } from "@/store/hooks";

export const getCoordinadora = () => {
	const users = useAppSelector((state) => state.auth.users);
	return users.filter((user: any) => user.role == "coordinadora");
};

export const getMadresPorCoordinadora = (idCoordinadora: any) => {
	const users = useAppSelector((state) => state.auth.users);
	return users.filter((user: any) => user.coordinadora == idCoordinadora);
};

export const getDistribucionesPorCoordinadora = (idCoordinadora: number) => {
  const distribucionList = useAppSelector((state) => state.insumos.registroDistribucion);

  // Filtra todas las distribuciones para encontrar las que contienen la coordinadora con el ID especificado
  const distribucionesCoordinadora = distribucionList
    .filter((distribucion: any) => 
      distribucion.coordinadoras.some((coordinadora: any) => coordinadora.id === idCoordinadora)
    )
    .map((distribucion: any) => {
      const coordinadora = distribucion.coordinadoras.find((coord: any) => coord.id === idCoordinadora);
      return {
        ...coordinadora,
        distribucionDate: distribucion.date
      };
    });

  return distribucionesCoordinadora;
};