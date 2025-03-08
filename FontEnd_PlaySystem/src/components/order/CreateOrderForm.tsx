import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./createOrderForm.scss";
import { RootState } from "../../app/store";
import useEnums from "../../services/api/enumsService";
import api from "../../services/api/api";

interface Cliente {
	id: string;
	nombreEmpresa: string;
	nit: string;
	emailContacto: string;
	telefonoContacto: string;
}

interface Dependencia {
	idDependencia: string;
	numLocal: string;
	puntoVenta: string;
	direccion: string;
	fechaCreacion: string;
	tels: string;
	instalador: string;
	ent: string; // "Local", "Nacional", "Internacional"
	parqueadero: string;
	cenefa: string;
	banderinesExternos: string;
	vinilosVidrios: string;
	pendones: string;
	antenas: string;
	cabezotes: string;
	area: string;
	horario: string; // HorarioEnum
	ciudad: string; // CiudadEnum
	region: string; // RegionEnum
	prioridad: string; // PrioridadEnum
	envio: string; // EnvioEnum
	tamanoTienda: string; // TamanoTiendaEnum
	tipoEstructura: string; // TipoEstructuraEnum
}

interface Filter {
	characteristic: string;
	value: string;
}

const CreateOrderForm: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
	const [dependencias, setDependencias] = useState<Dependencia[]>([]);
	const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);
	const [filters, setFilters] = useState<Filter[]>([{ characteristic: "", value: "" }]);
	const [loading, setLoading] = useState(false);
	const token = useSelector((state: RootState) => state.user.token);

	// Cargar enums desde el backend usando useEnums
	const { data: entOptions } = useEnums("entrega");
	const { data: ciudadOptions } = useEnums("ciudad");
	const { data: regionOptions } = useEnums("region");
	const { data: prioridadOptions } = useEnums("prioridad");
	const { data: envioOptions } = useEnums("envio");

	// Opciones de características
	const characteristicOptions = [
		{ value: "", label: "Selecciona una característica" },
		{ value: "ent", label: "Entregas" },
		{ value: "ciudad", label: "Ciudad" },
		{ value: "region", label: "Región" },
		{ value: "prioridad", label: "Prioridad" },
		{ value: "envio", label: "Envío" },
	];

	// Mapeo de opciones de valores desde enums
	const valueOptions: { [key: string]: { value: string; label: string }[] } = {
		ent: [{ value: "", label: "Todas" }, ...(entOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		ciudad: [{ value: "", label: "Todas" }, ...(ciudadOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		region: [{ value: "", label: "Todas" }, ...(regionOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		prioridad: [{ value: "", label: "Todas" }, ...(prioridadOptions?.map(opt => ({ value: opt, label: opt })) || [])],
		envio: [{ value: "", label: "Todos" }, ...(envioOptions?.map(opt => ({ value: opt, label: opt })) || [])],
	};

	// Búsqueda de clientes
	useEffect(() => {
		if (searchQuery.length < 2) {
			setClientes([]);
			return;
		}

		const fetchClientes = async () => {
			setLoading(true);
			try {
				const response = await api.get(`/clientes/search?query=${searchQuery}&limit=10`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setClientes(response.data);
			} catch (error) {
				console.error("Error al buscar clientes:", error);
				setClientes([]);
			} finally {
				setLoading(false);
			}
		};

		const debounce = setTimeout(fetchClientes, 300);
		return () => clearTimeout(debounce);
	}, [searchQuery, token]);

	// Cargar dependencias del cliente seleccionado
	useEffect(() => {
		if (!selectedClient) {
			setDependencias([]);
			setSelectedDependencies([]);
			setFilters([{ characteristic: "", value: "" }]);
			return;
		}

		const fetchDependencias = async () => {
			setLoading(true);
			try {
				const response = await api.get(`/dependencias/cliente/${selectedClient.id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setDependencias(response.data);
			} catch (error) {
				console.error("Error al cargar dependencias:", error);
				setDependencias([]);
			} finally {
				setLoading(false);
			}
		};

		fetchDependencias();
	}, [selectedClient, token]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		if (selectedClient) setSelectedClient(null);
	};

	const handleClientSelect = (cliente: Cliente) => {
		setSelectedClient(cliente);
		setSearchQuery("");
		setClientes([]);
	};

	const handleFilterChange = (index: number, field: "characteristic" | "value", value: string) => {
		const newFilters = [...filters];
		newFilters[index][field] = value;
		if (field === "characteristic") newFilters[index].value = ""; // Resetear valor si cambia la característica
		setFilters(newFilters);
		// No reseteamos selectedDependencies aquí para mantener las selecciones
	};

	const handleAddFilter = () => {
		setFilters([...filters, { characteristic: "", value: "" }]);
	};

	const handleRemoveFilter = (index: number) => {
		const newFilters = filters.filter((_, i) => i !== index);
		setFilters(newFilters.length > 0 ? newFilters : [{ characteristic: "", value: "" }]);
		// No reseteamos selectedDependencies aquí
	};

	const handleDependencyToggle = (idDependencia: string) => {
		setSelectedDependencies(prev =>
			prev.includes(idDependencia)
				? prev.filter(id => id !== idDependencia)
				: [...prev, idDependencia]
		);
	};

	const handleSelectAllFiltered = () => {
		const filteredIds = filteredDependencies.map(dep => dep.idDependencia);
		setSelectedDependencies(prev => {
			// Mantener las selecciones previas que no estén en conflicto con el filtro actual
			const keptSelections = prev.filter(id => filteredIds.includes(id));
			// Añadir todas las nuevas dependencias filtradas
			return [...new Set([...keptSelections, ...filteredIds])];
		});
	};

	const filteredDependencies = dependencias.filter(dep => {
		return filters.every(filter => {
			if (!filter.characteristic || !filter.value) return true;
			return dep[filter.characteristic as keyof Dependencia] === filter.value;
		});
	});

	return (
		<div className="createOrderForm">
			<label>
				Buscar Cliente:
				<input
					type="text"
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder="Escribe el nombre o NIT del cliente..."
					disabled={!!selectedClient}
				/>
			</label>
			{loading && <p>Cargando...</p>}
			{searchQuery.length >= 2 && !loading && !selectedClient && (
				<ul className="clientSuggestions">
					{clientes.length > 0 ? (
						clientes.map((cliente) => (
							<li
								key={cliente.id}
								onClick={() => handleClientSelect(cliente)}
								className="clientSuggestionItem"
							>
								{cliente.nombreEmpresa} - {cliente.nit}
							</li>
						))
					) : (
						<li>No se encontraron clientes.</li>
					)}
				</ul>
			)}
			{selectedClient && (
				<div className="selectedClientInfo">
					<h3>Cliente Seleccionado</h3>
					<p><strong>Nombre:</strong> {selectedClient.nombreEmpresa}</p>
					<p><strong>NIT:</strong> {selectedClient.nit}</p>
					<p><strong>Email:</strong> {selectedClient.emailContacto || "No disponible"}</p>
					<p><strong>Teléfono:</strong> {selectedClient.telefonoContacto || "No disponible"}</p>
					<button onClick={() => setSelectedClient(null)} className="clearSelectionBtn">
						Cambiar Cliente
					</button>
				</div>
			)}
			{selectedClient && (
				<div className="dependenciesSection">
					<h3>Seleccionar Dependencias</h3>
					<div className="dependencyFilters">
						{filters.map((filter, index) => (
							<div key={index} className="filterRow">
								<label>
									Característica:
									<select
										value={filter.characteristic}
										onChange={e => handleFilterChange(index, "characteristic", e.target.value)}
									>
										{characteristicOptions.map(opt => (
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
											onChange={e => handleFilterChange(index, "value", e.target.value)}
										>
											{valueOptions[filter.characteristic]?.map(opt => (
												<option key={opt.value} value={opt.value}>
													{opt.label}
												</option>
											))}
										</select>
									</label>
								)}
								{filters.length > 1 && (
									<button
										onClick={() => handleRemoveFilter(index)}
										className="removeFilterBtn"
									>
										Eliminar
									</button>
								)}
							</div>
						))}
						<button onClick={handleAddFilter} className="addFilterBtn">
							Agregar más características
						</button>
					</div>
					{dependencias.length > 0 && (
						<>
							<button onClick={handleSelectAllFiltered} className="selectAllBtn">
								Seleccionar todas las filtradas
							</button>
							<ul className="dependencyList">
								{filteredDependencies.map(dep => (
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
					)}
					{dependencias.length === 0 && !loading && (
						<p>No hay dependencias disponibles para este cliente.</p>
					)}
				</div>
			)}
		</div>
	);
};

export default CreateOrderForm;