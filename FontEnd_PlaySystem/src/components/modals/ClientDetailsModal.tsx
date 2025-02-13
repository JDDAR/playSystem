import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./clientDetailsModal.scss";
import DependencyClient from "../layout/Client/DependencyClient";

import { LuShapes } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
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
      <div className="containerClientModal_modal-header">
        <button onClick={onClose}>
          <LuArrowLeft /> Volver a la lista de clientes
        </button>
        <button onClick={() => navigate("/")}>Inicio</button>
      </div>

      <div className="containerClientModal_modal-content">
        <div className="left-container">
          <div className="left-container__Header">
            <figure>
              <img />
            </figure>
            <div className="left-container__Header_right">
              <h2>{cliente.nombreEmpresa}</h2>
              <h4>{cliente.nit}</h4>
            </div>
          </div>
          <div className="left-container__infoCliente">
            <p>
              <strong>Email</strong> {cliente.emailContacto}
            </p>

            <p>
              <strong>Teléfono</strong> {cliente.telefonoContacto}
            </p>
            <p>
              <strong>Dirección</strong> {cliente.direccionPrincipal}
            </p>
            <p>
              <strong>NIT</strong> {cliente.nit}
            </p>
          </div>
          <div className="left-container__footer">
            <p>
              <strong>Descripción:</strong> {cliente.descripcion}
            </p>
            <p>
              <strong>Observaciones:</strong> {cliente.observaciones}
            </p>
          </div>
        </div>

        {/* Contenedor de la derecha: Navegación */}
        <div className="right-container">
          <nav>
            <button onClick={() => setSelectedSection("tiendas")}>
              <LuShapes /> Tiendas
            </button>
            <button onClick={() => setSelectedSection("proyectos")}>
              Proyectos
            </button>
          </nav>

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
