import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { closeModal, openModal } from "../../features/ui/uiSlice";
import api from "../../services/api/api";
import ClientSearch from "./ClientSearch";
import ClientInfo from "./ClientInfo";
import DependencyFilters from "./DependencyFilters";
import DependencyList from "./DependencyList";
import CreateProjectButton from "./CreateProjectButton";
import { Cliente } from "../../models/Cliente";
import "./createOrderForm.scss";
import { Tienda } from "../../models/dependency.model";
import { ProyectoResponse } from "../../models/Proyecto";
import ProjectModalContent from "./ProjectModalContent";

interface Filter {
	characteristic: string;
	value: string;
}

const CreateOrderForm: React.FC = () => {
	const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
	const [dependencias, setDependencias] = useState<Tienda[]>([]);
	const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);
	const [filters, setFilters] = useState<Filter[]>([{ characteristic: "", value: "" }]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const token = useSelector((state: RootState) => state.user.token);
	const dispatch = useDispatch();

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

	const handleDependencyToggle = (idDependencia: string) => {
		setSelectedDependencies((prev) =>
			prev.includes(idDependencia)
				? prev.filter((id) => id !== idDependencia)
				: [...prev, idDependencia]
		);
	};

	const handleSelectAllFiltered = () => {
		const filteredIds = filteredDependencies.map((dep) => dep.idDependencia);
		setSelectedDependencies((prev) => {
			const keptSelections = prev.filter((id) => filteredIds.includes(id));
			return [...new Set([...keptSelections, ...filteredIds])];
		});
	};

	// Cambio aquí: Usar "some" en lugar de "every" para filtrar con lógica OR
	const filteredDependencies = filters.every((filter) => !filter.characteristic || !filter.value)
		? dependencias
		: dependencias.filter((dep) =>
			filters.some((filter) => {
				if (!filter.characteristic || !filter.value) return false;
				return dep[filter.characteristic as keyof Tienda] === filter.value;
			})
		);

	const handleCreateProject = async () => {
		if (!selectedClient || selectedDependencies.length === 0) {
			dispatch(
				openModal({
					title: "Error",
					message: "Por favor selecciona un cliente y al menos una dependencia.",
					variant: "error",
					autoClose: true,
				})
			);
			return;
		}
		setSubmitting(true);
		try {
			const projectData = {
				clientId: selectedClient.id,
				dependencyIds: selectedDependencies,
			};

			const response = await api.post<ProyectoResponse>("/proyectos/create", projectData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			const proyecto = response.data;
			dispatch(
				openModal({
					title: "Creando Proyecto",
					message: "",
					variant: "infoLarge",
					autoClose: false,
					content: <ProjectModalContent proyecto={proyecto} filters={filters} />,
					confirmText: "Aceptar",
					cancelText: "Cancelar",
					extraClasses: "modalLarge",
				})
			);
		} catch (error) {
			console.error("Error al crear el proyecto:", error);
			dispatch(
				openModal({
					title: "Error",
					message: "No se pudo crear el proyecto. Intenta de nuevo.",
					variant: "error",
					autoClose: true,
				})
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="createOrderForm">
			<ClientSearch token={token} selectedClient={selectedClient} setSelectedClient={setSelectedClient} />
			{selectedClient && <ClientInfo selectedClient={selectedClient} setSelectedClient={setSelectedClient} />}
			{selectedClient && (
				<div className="dependenciesSection">
					<h3>Seleccionar Dependencias</h3>
					<DependencyFilters filters={filters} setFilters={setFilters} />
					{dependencias.length > 0 && (
						<>
							<DependencyList
								dependencias={filteredDependencies}
								selectedDependencies={selectedDependencies}
								handleDependencyToggle={handleDependencyToggle}
								handleSelectAllFiltered={handleSelectAllFiltered}
							/>
							<CreateProjectButton
								submitting={submitting}
								selectedDependencies={selectedDependencies}
								handleCreateProject={handleCreateProject}
							/>
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