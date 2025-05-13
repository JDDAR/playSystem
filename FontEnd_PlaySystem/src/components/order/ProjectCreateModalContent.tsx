import React from "react";
import { ProyectoResponse } from "../../models/Proyecto";
import { Tienda } from "../../models/dependency.model";
import "./projectCreateModalContent.scss";

interface Filter {
	characteristic: string;
	value: string;
}

interface ProjectCreateModalContentProps {
	proyecto: ProyectoResponse;
	filters: Filter[]; // Recibimos los filtros seleccionados
}

const ProjectCreateModalContent: React.FC<ProjectCreateModalContentProps> = ({ proyecto, filters }) => {
	// Filtrar las dependencias según los filtros seleccionados y agruparlas
	const groupedDependencies: { [characteristic: string]: { [value: string]: Tienda[] } } = {};

	filters.forEach((filter) => {
		if (filter.characteristic && filter.value) {
			const depsForValue = proyecto.dependencias.filter(
				(dep) => dep[filter.characteristic as keyof Tienda] === filter.value
			);
			if (!groupedDependencies[filter.characteristic]) {
				groupedDependencies[filter.characteristic] = {};
			}
			groupedDependencies[filter.characteristic][filter.value] = depsForValue;
		}
	});

	return (
		<div className="projectModalContainer">
			<section className="projectModalContainer-header">
				<h2>PLAYVISUAL</h2>
				<p>
					<strong>Proyecto:</strong> # {proyecto.numeroProyecto}
				</p>
			</section>
			<section className="projectModalContainer-infoProject">
				<p>
					<strong>Estado:</strong> {proyecto.estadoProyecto}
				</p>
			</section>
			<section className="projectModalContainer-infoClientValor">
				<div className="projectModalContainer-infoClient">
					<p>
						<strong>Nombre del Cliente:</strong> {proyecto.clienteNombre}
					</p>
					<p>
						<strong>Fecha de Creación:</strong> {new Date(proyecto.fechaCreacion).toLocaleString()}
					</p>
					<div className="dependencies-container">
						{Object.entries(groupedDependencies).map(([characteristic, values]) => (
							<div key={characteristic}>
								<p>
									<strong>Dependencias asociadas por {characteristic}:</strong>
								</p>
								{Object.entries(values).map(([value, deps]) => (
									<div key={value} className="filter-value-container">
										<span className="filter-value">
											{value} ({deps.length})
										</span>
										<div className="dependencies-list">
											<ul>
												{deps.map((dep) => (
													<li key={dep.idDependencia}>{dep.puntoVenta}</li>
												))}
											</ul>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
				<div>
					<h2>TOTAL</h2>
				</div>
			</section>
		</div>
	);
};

export default ProjectCreateModalContent;