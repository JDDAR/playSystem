import React, { useState } from "react";
import "./orderList.scss"; // Nuevo archivo de estilos

const OrderList: React.FC = () => {
	const [localSearch, setLocalSearch] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<"all" | "nombre" | "descripcion" | "estado">("all");
	const [estadoFilter, setEstadoFilter] = useState<string>("all");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSearch(e.target.value);
		// Aquí irá la lógica de búsqueda cuando haya datos
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedFilter(e.target.value as "all" | "nombre" | "descripcion" | "estado");
		// Aquí irá la lógica de filtrado cuando haya datos
	};

	const handleEstadoFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEstadoFilter(e.target.value);
		// Aquí irá la lógica de filtrado por estado cuando haya datos
	};

	// Por ahora, la lista está vacía
	const orders = [];

	return (
		<div className="containerOrderList">
			<div className="containerOrderList_search">
				<input
					type="text"
					placeholder="Buscar órdenes..."
					value={localSearch}
					onChange={handleSearchChange}
				/>
				<select value={selectedFilter} onChange={handleFilterChange}>
					<option value="all">Todos los campos</option>
					<option value="nombre">Nombre</option>
					<option value="descripcion">Descripción</option>
					<option value="estado">Estado</option>
				</select>
				<select
					value={estadoFilter}
					className="selectEstado"
					onChange={handleEstadoFilterChange}
				>
					<option value="all">Todos los estados</option>
					<option value="Pendiente">Pendiente</option>
					<option value="En progreso">En progreso</option>
					<option value="Completado">Completado</option>
				</select>
			</div>

			<div className="containerOrderList_list">
				{orders.length === 0 && <p>No hay órdenes disponibles.</p>}
				{/* Aquí irá la lista de órdenes cuando haya datos */}
			</div>
		</div>
	);
};

export default OrderList;