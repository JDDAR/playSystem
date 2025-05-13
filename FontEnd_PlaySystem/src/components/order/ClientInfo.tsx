import React from "react";
import { Cliente } from "../../models/Cliente";

interface ClientInfoProps {
	selectedClient: Cliente;
	setSelectedClient: (cliente: Cliente | null) => void;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ selectedClient, setSelectedClient }) => {
	return (
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
	);
};

export default ClientInfo;