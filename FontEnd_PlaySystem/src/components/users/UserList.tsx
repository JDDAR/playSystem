import React, { useState } from "react";
import { Cliente } from "../../models/Cliente";
import "./userList.scss";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/ui/uiSlice";
import UserCreateForms from "./UserCreateForms";

interface UserListProps {
  users: Cliente[];
  onUserClick?: (user: Cliente) => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (filterType: keyof Cliente | "all") => void;
  roleFilter?: string;
  onRoleFilterChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UserList: React.FC<UserListProps> = ({
  users = [],
  onUserClick = () => {},
  onSearch = () => {},
  onFilterChange = () => {},
  roleFilter = "all",
  onRoleFilterChange = () => {},
}) => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<keyof Cliente | "all">(
    "all",
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof Cliente | "all";
    setSelectedFilter(value);
    onFilterChange(value);
  };

  const filteredUsers = users.filter((user) => {
    if (!localSearch) return true;
    const query = localSearch.toLowerCase();

    if (selectedFilter === "all") {
      return Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query),
      );
    }

    return String(user[selectedFilter]).toLowerCase().includes(query);
  });

  const handleNewUser = () => {
    dispatch(
      openModal({
        title: "Nuevo Usuario",
        message: "",
        variant: "modalForms",
        autoClose: false,
        content: <UserCreateForms />,
        confirmText: "Aceptar",
        cancelText: "Cancelar",
        extraClasses: "modalMedium",
      }),
    );
  };

  return (
    <div className="containerListUsers">
      <div className="containerListUsers_search">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={localSearch}
          onChange={handleSearchChange}
        />

        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="all">Todos los campos</option>
          <option value="nombreEmpresa">Nombre de la empresa</option>
          <option value="nit">NIT</option>
          <option value="emailContacto">Email de contacto</option>
          <option value="telefonoContacto">Teléfono de contacto</option>
          <option value="direccionPrincipal">Dirección principal</option>
        </select>

        <select
          value={roleFilter}
          className="selectRole"
          onChange={onRoleFilterChange}
        >
          <option value="all">Todos los roles</option>
          <option value="CLIENT">Clientes</option>
          <option value="ADMIN">Administradores</option>
        </select>

        <button onClick={() => handleNewUser()}>Nuevo Usuario</button>
      </div>

      <div className="containerListUsers_list">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="containerListUsers_card"
            onClick={() => onUserClick(user)}
          >
            <div className="containerListUsers_card-header">
              <figure>
                <img />
              </figure>
              <div>
                <h3>{user.nombreEmpresa}</h3>
                <span>{user.nit}</span>
              </div>
            </div>
            <div className="containerListUsers_card-content">
              <p>{user.descripcion}</p>
              <div className="containerListUsers_card-content-buttons">
                <p>{user.telefonoContacto}</p>
                <p>{user.user?.email}</p>
                <p>{user.user?.role?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
