import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./DashboardCoordinadora.module.css";

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

export const DashboardCoordinadora: React.FC = () => {
	const data = {
		labels: [
			"Madre 1",
			"Madre 2",
			"Madre 3",
			"Madre 4",
			"Madre 5",
		],
		datasets: [
			{
				label: "Insumos Distribuidos",
				data: [3, 2, 3, 1, 2],
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

	return (
		<div className={styles.dashboard}>
			<header className={styles.header}>
				<h1>Dashboard - Coordinadora</h1>
			</header>
			<main className={styles.main}>
				<section className={styles.stats}>
					<h2>Estadísticas</h2>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>150</span>
						<span className={styles.statLabel}>Insumos Totales</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>75</span>
						<span className={styles.statLabel}>Insumos Distribuidos</span>
					</div>
					<div className={styles.statBox}>
						<span className={styles.statNumber}>5</span>
						<span className={styles.statLabel}>Madres de familia</span>
					</div>
				</section>

				<div className={styles.container__group}>
					<section className={styles.distribution}>
						<h2>Distribución de Insumos por hijo</h2>
						<Bar data={data} options={options} />
					</section>

					<section className={styles.coordinators}>
						<h2>Lista de Madres</h2>
						<ul className={styles.coordinatorList}>
							<li className={styles.coordinatorItem}>Madre 1</li>
							<li className={styles.coordinatorItem}>Madre 2</li>
							<li className={styles.coordinatorItem}>Madre 3</li>
							<li className={styles.coordinatorItem}>Madre 4</li>
							<li className={styles.coordinatorItem}>Madre 5</li>
						</ul>
					</section>
				</div>
			</main>
		</div>
	);
};
