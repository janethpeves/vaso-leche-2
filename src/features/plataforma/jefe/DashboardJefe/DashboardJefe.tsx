import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./DashboardJefe.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dataJefeDashboard } from "@/store/slices/insumos";

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

export const DashboardJefe: React.FC = () => {
	const dispatch = useAppDispatch();
	const insumos = useAppSelector((state) => state.insumos);
	const usuarios = useAppSelector((state) => state.auth.users);

	let [dataDashboard, setDataDashboard] = useState({
		insumosTotales: 0,
		insumosDistribuidos: 0,
		coordinadoras: [],
	});

	const data = {
		labels: ["Insumo", "Insumo", "Insumo", "Insumo", "Insumo"],
		datasets: [
			{
				label: "Insumos Distribuidos",
				data: [12, 19, 3, 5, 2],
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	useEffect(() => {
		if (insumos) {
			const totalInsumos = insumos?.insumosGenerales?.reduce(
				(acc: any, item: any) => {
					acc.cantidadCereal += parseInt(item.cantidadCereal);
					acc.cantidadLeche += parseInt(item.cantidadLeche);
					return acc;
				},
				{ cantidadCereal: 0, cantidadLeche: 0 }
			);

			const insumosDistribuidos = insumos?.registroDistribucion?.reduce(
				(acc: any, registro: any) => {
					registro.coordinadoras.forEach((coordinadora: any) => {
						acc.totalLeche += coordinadora.totalLeche;
						acc.totalCereal += coordinadora.totalCereal;
					});
					return acc;
				},
				{ totalLeche: 0, totalCereal: 0 }
			);

			const coordinadoras = usuarios?.filter((user: any) => user.role === "coordinadora");

			setDataDashboard({
				insumosTotales: totalInsumos?.cantidadCereal + totalInsumos?.cantidadLeche,
				insumosDistribuidos: insumosDistribuidos?.totalCereal + insumosDistribuidos?.totalLeche,
				coordinadoras: coordinadoras || [],
			});
		}
	}, [insumos]);

	return (
		<div className={styles.dashboard}>
			<header className={styles.header}>
				<h1>Dashboard - Jefe</h1>
			</header>
			<main className={styles.main}>
				<section className={styles.stats}>
					<h2>Estadísticas</h2>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.insumosTotales}</span>
						<span className={styles.statLabel}>Insumos Totales</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.insumosDistribuidos}</span>
						<span className={styles.statLabel}>Insumos Distribuidos</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.coordinadoras?.length}</span>
						<span className={styles.statLabel}>Coordinadoras</span>
					</div>
				</section>

				<div className={styles.container__group}>
					<section className={styles.distribution}>
						<h2>Distribución de Insumos</h2>
						<Bar data={data} options={options} />
					</section>

					<section className={styles.coordinators}>
						<h2>Lista de Coordinadoras</h2>
						<ul className={styles.coordinatorList}>
							{dataDashboard?.coordinadoras &&
								dataDashboard?.coordinadoras.map((coordinadora: any) => (
									<li className={styles.coordinatorItem}>{coordinadora.name}</li>
								))}
						</ul>
					</section>
				</div>
			</main>
		</div>
	);
};
