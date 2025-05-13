import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import "./clientDetailsModal.scss";
import DependencyClient from "../layout/Client/DependencyClient";
import { LuShapes, LuArrowLeft } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import UserEditForm from "../users/UserEditForm";

interface ClientDetailsModalProps {
  cliente: {
    id: string;
    nombreEmpresa: string;
    emailContacto: string;
    telefonoContacto: string;
    descripcion: string;
    direccionPrincipal: string;
    nit: string;
    observaciones: string;
    user: {
      id: string;
      userName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      identificationNumber: string;
      documentType: string;
      role: { id: number; name: string };
    };
  };
  onClose: () => void;
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ cliente, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const [selectedSection, setSelectedSection] = useState("tiendas");
  const [menuOpen, setMenuOpen] = useState(false);

  // Deshabilitar scroll del body al abrir el modal
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleDeleteUser = () => {
    setMenuOpen(false);
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar al usuario ${cliente.user.userName}? Esto eliminará también el cliente y sus dependencias.`);
    if (confirmDelete) {
      console.log("Token enviado:", token); // Depurar el token
      fetch(`http://localhost:9091/api/users/${cliente.user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Respuesta del servidor:", response.status, response.statusText); // Depurar respuesta
          if (response.ok) {
            alert(`Usuario ${cliente.user.userName} eliminado exitosamente`);
            onClose();
          } else {
            return response.text().then((text) => {
              throw new Error(`Error ${response.status}: ${text}`);
            });
          }
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          alert("Error al eliminar el usuario: " + error.message);
        });
    }
  };

  const handleEditUser = () => {
    setMenuOpen(false);
    dispatch(
      openModal({
        title: "Editar Usuario",
        message: "",
        variant: "modalForms",
        autoClose: false,
        content: <UserEditForm user={cliente.user} client={cliente.user.role.name === "CLIENT" ? cliente : null} />,
        confirmText: "Guardar",
        cancelText: "Cancelar",
        extraClasses: "modalMedium",
      })
    );
  };

  return (
    <div className="containerClientModal">
      <div className="containerClientModal_modal-header">
        <button onClick={onClose}>
          <LuArrowLeft /> Volver a la lista de clientes
        </button>
        <button onClick={() => navigate("/")}>Inicio</button>
      </div>

      <div className="containerClientModal_modal-content">
        <div className="left-container">
          <div className="left-container__Header">
            <figure><img /></figure>
            <div className="left-container__Header_right">
              <h2>{cliente.nombreEmpresa}</h2>
              <h4>{cliente.nit}</h4>
            </div>
          </div>
          <div className="left-container__infoCliente">
            <p><strong>Email</strong> {cliente.emailContacto}</p>
            <p><strong>Teléfono</strong> {cliente.telefonoContacto}</p>
            <p><strong>Dirección</strong> {cliente.direccionPrincipal}</p>
            <p><strong>NIT</strong> {cliente.nit}</p>
          </div>
          <div className="left-container__footer">
            <p><strong>Descripción:</strong> {cliente.descripcion}</p>
            <p><strong>Observaciones:</strong> {cliente.observaciones}</p>
          </div>
        </div>

        <div className="right-container">
          <nav>
            <button onClick={() => setSelectedSection("tiendas")}>
              <LuShapes /> Tiendas
            </button>
            <button onClick={() => setSelectedSection("proyectos")}>
              Proyectos
            </button>
            <div className="right-container_menu-container" >
              <button onClick={handleMenuToggle} className="menu-button">
                <HiDotsVertical />
              </button>
              {menuOpen && (
                <div className="dropdown-menu" style={{
                  position: "absolute",
                  right: "25px",
                  top: "35px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  zIndex: 1000,
                  width: "200px"
                }}>
                  <button onClick={handleEditUser} style={{ display: "flex", alignItems: "center", padding: "8px 16px", width: "100%", border: "none", background: "none", cursor: "pointer" }}>
                    <MdEdit style={{ marginRight: "8px" }} /> Editar usuario
                  </button>
                  <button onClick={handleDeleteUser} style={{ display: "flex", alignItems: "center", padding: "8px 16px", width: "100%", border: "none", background: "none", cursor: "pointer" }}>
                    <MdDelete style={{ marginRight: "8px" }} /> Eliminar usuario
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="section-content">
            {selectedSection === "tiendas" && <DependencyClient idClient={cliente.id} />}
            {selectedSection === "proyectos" && (
              <div>
                <h3>Proyectos</h3>
                <p>Proyectos del cliente...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;