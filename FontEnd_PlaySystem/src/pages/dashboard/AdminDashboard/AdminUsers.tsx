import { useEffect, useState } from "react";
import { DynamicHeader } from "../../../components/layout";
import api from "../../../services/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ClientDetailsModal } from "../../../components/modals";

import "./adminUsers.scss";

interface Cliente {
  id: string;
  nombreEmpresa: string;
  descripcion: string;
  emailContacto: string;
  telefonoContacto: string;
  direccionPrincipal: string;
  nit: string;
  observaciones: string;
  user: {
    userName: string;
  };
}

const AdminUsers = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes/listaClientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Respuesta del back", response.data);
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };
    fetchClientes();
  }, [token]);
  // Función para abrir el modal con los detalles del cliente
  const handleClienteClick = (cliente: Cliente) => {
    setSelectedCliente(cliente);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedCliente(null);
  };
  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Aquí puedes implementar la lógica de filtrado
  };

  // Función para manejar el botón "Nuevo Cliente"
  const handleNuevoCliente = () => {
    // Lógica para agregar un nuevo cliente
    console.log("Nuevo Cliente");
  };

  // Filtrar clientes antes de mapearlos
  const filteredClientes = Array.isArray(clientes)
    ? clientes.filter((cliente) =>
        cliente.nombreEmpresa.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div className="containerAdminUsers">
      <DynamicHeader
        title="Clientes"
        searchPlaceholder="Buscar cliente..."
        primaryButtonText="Nuevo Cliente"
        onSearch={handleSearch} // Maneja la búsqueda
        onPrimaryButtonClick={handleNuevoCliente}
      />
      <div className="containerAdminUsers_list">
        {filteredClientes.map((cliente) => (
          <div
            key={cliente.id}
            className="containerAdminUsers_card"
            onClick={() => handleClienteClick(cliente)}
          >
            <div className="containerAdminUsers_card-header">
              <figure>
                <img />
              </figure>
              <div>
                <h3>{cliente.nombreEmpresa}</h3>
                <span>{cliente.nit}</span>
              </div>
            </div>
            <div className="containerAdminUsers_card-content">
              <p>{cliente.descripcion}</p>
              <div className="containerAdminUsers_card-content-buttons">
                <p>{cliente.telefonoContacto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
      {/* Mostrar el modal si hay un cliente seleccionado */}
      {selectedCliente && (
        <ClientDetailsModal
          cliente={selectedCliente}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminUsers;
