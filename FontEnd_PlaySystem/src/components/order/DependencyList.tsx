import React from "react";
import { Tienda } from "../../models/dependency.model";

interface DependencyListProps {
	dependencias: Tienda[];
	selectedDependencies: string[];
	handleDependencyToggle: (idDependencia: string) => void;
	handleSelectAllFiltered: () => void;
}

const DependencyList: React.FC<DependencyListProps> = ({
	dependencias,
	selectedDependencies,
	handleDependencyToggle,
	handleSelectAllFiltered,
}) => {
	return (
		<>
			<button onClick={handleSelectAllFiltered} className="selectAllBtn">
				Seleccionar todas las filtradas
			</button>
			<ul className="dependencyList">
				{dependencias.map((dep) => (
					<li key={dep.idDependencia}>
						<label>
							<input
								type="checkbox"
								checked={selectedDependencies.includes(dep.idDependencia)}
								onChange={() => handleDependencyToggle(dep.idDependencia)}
							/>
							{dep.puntoVenta} ({dep.ent}, {dep.ciudad}, {dep.region})
						</label>
					</li>
				))}
			</ul>
			<p>Dependencias seleccionadas: {selectedDependencies.length}</p>
		</>
	);
};

export default DependencyList;