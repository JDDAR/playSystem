import React, { useState, useEffect } from "react";
import api from "../../services/api/api";
import { Cliente } from "../../models/Cliente";

interface ClientSearchProps {
	token: string;
	selectedClient: Cliente | null;
	setSelectedClient: (cliente: Cliente | null) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ token, selectedClient, setSelectedClient }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [loading, setLoading] = useState(false);

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

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		if (selectedClient) setSelectedClient(null);
	};

	const handleClientSelect = (cliente: Cliente) => {
		setSelectedClient(cliente);
		setSearchQuery("");
		setClientes([]);
	};

	return (
		<div>
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
		</div>
	);
};

export default ClientSearch;