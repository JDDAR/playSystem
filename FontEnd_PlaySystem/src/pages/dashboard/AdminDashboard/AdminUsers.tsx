import { useEffect, useState } from "react";
import { DynamicHeader } from "../../../components/layout";
import api from "../../../services/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ClientDetailsModal } from "../../../components/modals";
import { UserList } from "../../../components/users";
import { Cliente } from "../../../models/Cliente";

import "./adminUsers.scss";

const AdminUsers = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [filterType, setFilterType] = useState<keyof Cliente | "all">("all");
  const [roleFilter, setRoleFilter] = useState<string>("CLIENT"); // Filtro por rol

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

  const handleClienteClick = (cliente: Cliente) => {
    setSelectedCliente(cliente);
  };

  const handleCloseModal = () => {
    setSelectedCliente(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: keyof Cliente | "all") => {
    setFilterType(filterType);
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const filteredClientes = clientes.filter((cliente) => {
    if (roleFilter !== "all" && cliente.user.role.name !== roleFilter)
      return false;

    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    if (filterType === "all") {
      return Object.values(cliente).some((value) =>
        String(value).toLowerCase().includes(query),
      );
    }

    return String(cliente[filterType]).toLowerCase().includes(query);
  });

  return (
    <div className="containerAdminUsers">
      <DynamicHeader title="Clientes" />
      <UserList
        users={filteredClientes}
        onUserClick={handleClienteClick}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        roleFilter={roleFilter} // Pasar el estado del filtro de roles
        onRoleFilterChange={handleRoleFilterChange} // Pasar la función para cambiar el filtro de roles
      />
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
