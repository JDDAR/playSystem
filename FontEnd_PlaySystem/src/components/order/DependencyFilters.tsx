import React from "react";
import useEnums from "../../services/api/enumsService";

interface Filter {
	characteristic: string;
	value: string;
}

interface DependencyFiltersProps {
	filters: Filter[];
	setFilters: (filters: Filter[]) => void;
}

const DependencyFilters: React.FC<DependencyFiltersProps> = ({ filters, setFilters }) => {
	const { data: entOptions } = useEnums("entrega");
	const { data: ciudadOptions } = useEnums("ciudad");
	const { data: regionOptions } = useEnums("region");
	const { data: prioridadOptions } = useEnums("prioridad");
	const { data: envioOptions } = useEnums("envio");

	const characteristicOptions = [
		{ value: "", label: "Selecciona una característica" },
		{ value: "ent", label: "Entregas" },
		{ value: "ciudad", label: "Ciudad" },
		{ value: "region", label: "Región" },
		{ value: "prioridad", label: "Prioridad" },
		{ value: "envio", label: "Envío" },
	];

	const valueOptions: { [key: string]: { value: string; label: string }[] } = {
		ent: [{ value: "", label: "Todas" }, ...(entOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		ciudad: [{ value: "", label: "Todas" }, ...(ciudadOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		region: [{ value: "", label: "Todas" }, ...(regionOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		prioridad: [{ value: "", label: "Todas" }, ...(prioridadOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		envio: [{ value: "", label: "Todos" }, ...(envioOptions?.map(opt => ({ value: opt, label: opt })) || [])],
	};

	const handleFilterChange = (index: number, field: "characteristic" | "value", value: string) => {
		const newFilters = [...filters];
		newFilters[index][field] = value;
		if (field === "characteristic") newFilters[index].value = "";
		setFilters(newFilters);
	};

	const handleAddFilter = () => {
		setFilters([...filters, { characteristic: "", value: "" }]);
	};

	const handleRemoveFilter = (index: number) => {
		const newFilters = filters.filter((_, i) => i !== index);
		setFilters(newFilters.length > 0 ? newFilters : [{ characteristic: "", value: "" }]);
	};

	return (
		<div className="dependencyFilters">
			{filters.map((filter, index) => (
				<div key={index} className="filterRow">
					<label>
						Característica:
						<select
							value={filter.characteristic}
							onChange={(e) => handleFilterChange(index, "characteristic", e.target.value)}
						>
							{characteristicOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</label>
					{filter.characteristic && (
						<label>
							Valor:
							<select
								value={filter.value}
								onChange={(e) => handleFilterChange(index, "value", e.target.value)}
							>
								{valueOptions[filter.characteristic]?.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</label>
					)}
					{filters.length > 1 && (
						<button onClick={() => handleRemoveFilter(index)} className="removeFilterBtn">
							Eliminar
						</button>
					)}
				</div>
			))}
			<button onClick={handleAddFilter} className="addFilterBtn">
				Agregar más características
			</button>
		</div>
	);
};

export default DependencyFilters;