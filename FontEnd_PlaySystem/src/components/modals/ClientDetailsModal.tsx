import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./clientDetailsModal.scss";
import DependencyClient from "../layout/Client/DependencyClient";

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
  };
  onClose: () => void;
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  cliente,
  onClose,
}) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("tiendas");

  return (
    <div className="containerClientModal">
      {/* Botones superiores */}
      <div className="containerClientModal_modal-header">
        <button onClick={onClose}>Volver a la lista de clientes</button>
        <button onClick={() => navigate("/")}>Inicio</button>
      </div>

      <div className="containerClientModal_modal-content">
        <div className="left-container">
          <h2>{cliente.nombreEmpresa}</h2>
          <p>
            <strong>Email:</strong> {cliente.emailContacto}
          </p>
          <p>
            <strong>Teléfono:</strong> {cliente.telefonoContacto}
          </p>
          <p>
            <strong>Descripción:</strong> {cliente.descripcion}
          </p>
          <p>
            <strong>Dirección:</strong> {cliente.direccionPrincipal}
          </p>
          <p>
            <strong>NIT:</strong> {cliente.nit}
          </p>
          <p>
            <strong>Observaciones:</strong> {cliente.observaciones}
          </p>
        </div>

        {/* Contenedor de la derecha: Navegación */}
        <div className="right-container">
          <nav>
            <button onClick={() => setSelectedSection("tiendas")}>
              Tiendas
            </button>
            <button onClick={() => setSelectedSection("proyectos")}>
              Proyectos
            </button>
            {/* Puedes agregar más botones de navegación aquí en el futuro */}
          </nav>

          {/* Contenido dinámico según la sección seleccionada */}
          <div className="section-content">
            {selectedSection === "tiendas" && (
              <DependencyClient idClient={cliente.id} />
            )}
            {selectedSection === "proyectos" && (
              <div>
                <h3>Proyectos</h3>
                {/* Aquí irá la lista de proyectos */}
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
