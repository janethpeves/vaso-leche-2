import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./DashboardCoordinadora.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

export const DashboardCoordinadora: React.FC = () => {
	const insumosTotales = useAppSelector((state) => state.insumos);
	const insumos = useAppSelector((state) => state.madreInsumos);
	const usuarios = useAppSelector((state) => state.auth.users);
	const { id } = useAppSelector((state: any) => state.auth.login);

	let [dataDashboard, setDataDashboard] = useState({
		insumosTotales: 0,
		insumosDistribuidos: 0,
		madres: [],
	});

	const data = {
		labels: ["Insumos", "Insumos", "Insumos", "Insumos", "Insumos"],
		datasets: [
			{
				label: "Insumos Distribuidos",
				data: [0, 0, 0, 0, 0],
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
			const insumosCoordinadora = insumosTotales?.registroDistribucion?.reduce(
				(acc: any, registro: any) => {
					registro.coordinadoras.forEach((coordinadora: any) => {
						if (coordinadora.id == id) {
							acc.totalLeche += coordinadora.totalLeche;
							acc.totalCereal += coordinadora.totalCereal;
						}
					});
					return acc;
				},
				{ totalLeche: 0, totalCereal: 0 }
			);

			const insumosDistribuidos = insumos?.repartoInsumos?.reduce(
				(acc: any, registro: any) => {
					registro.madres.forEach((madre: any) => {
						if (madre.coordinadora == id) {
							acc.totalLeche += madre.totalLeche;
							acc.totalCereal += madre.totalCereal;
						}
					});
					return acc;
				},
				{ totalLeche: 0, totalCereal: 0 }
			);

			const madres = usuarios?.filter(
				(user: any) => user.role === "madre" && user.coordinadora == id
			);

			setDataDashboard({
				insumosTotales: insumosCoordinadora?.totalCereal + insumosCoordinadora?.totalLeche,
				insumosDistribuidos: insumosDistribuidos?.totalCereal + insumosDistribuidos?.totalLeche,
				madres: madres || [],
			});
		}
	}, [insumos]);

	return (
		<div className={styles.dashboard}>
			<header className={styles.header}>
				<h1>Dashboard - Coordinadora</h1>
			</header>
			<main className={styles.main}>
				<section className={styles.stats}>
					<h2>Estadísticas</h2>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.insumosTotales}</span>
						<span className={styles.statLabel}>Insumos Totales Recibidos</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.insumosDistribuidos}</span>
						<span className={styles.statLabel}>Insumos Distribuidos a madres</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>{dataDashboard?.madres?.length}</span>
						<span className={styles.statLabel}>Madres de familia</span>
					</div>
				</section>

				<div className={styles.container__group}>
					<section className={styles.distribution}>
						<h2>Distribución de Insumos</h2>
						<Bar data={data} options={options} />
					</section>

					<section className={styles.coordinators}>
						<h2>Lista de Madres</h2>
						<ul className={styles.coordinatorList}>
							{dataDashboard?.madres &&
								dataDashboard?.madres.map((coordinadora: any) => (
									<li className={styles.coordinatorItem}>{coordinadora.name}</li>
								))}
						</ul>
					</section>
				</div>
			</main>
		</div>
	);
};
