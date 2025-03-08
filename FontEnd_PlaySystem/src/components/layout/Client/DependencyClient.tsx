import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { openModal, closeModal } from "../../../features/ui/uiSlice";
import api from "../../../services/api/api";
import { Tienda } from "../../../models/dependency.model";
import DependencyDetails from "../../dependencyDetails/DependencyDetails";
import FilterDependency from "./FilterDependency";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import "./dependencyClient.scss";
import EditDependenciaForm from "./EditDependenciaForm";

interface DependencyClientProps {
  idClient: string;
}

const DependencyClient: React.FC<DependencyClientProps> = ({ idClient }) => {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTienda, setExpandedTienda] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<keyof Tienda | "all">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idClient) return;
    const fetchDependency = async () => {
      try {
        const response = await api.get(`/dependencias/${idClient}/tiendas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Respuesta del Back Dependencias: ", response.data);
        setTiendas(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de Dependencias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDependency();
  }, [token, idClient]);

  const toggleDetails = (tiendaId: string) => {
    setExpandedTienda((prev) => (prev === tiendaId ? null : tiendaId));
  };

  const handleDeleteDependencia = (tiendaId: string, nombre: string) => {
    setMenuOpen(null);
    dispatch(
      openModal({
        title: "Confirmar Eliminación",
        message: `¿Estás seguro de eliminar la dependencia ${nombre}? Esto eliminará toda su información asociada.`,
        variant: "warning",
        autoClose: false,
        onConfirm: () => {
          api
            .delete(`/dependencias/${tiendaId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              setTiendas((prev) => prev.filter((t) => t.idDependencia !== tiendaId));
              dispatch(
                openModal({
                  title: "Éxito",
                  message: `Dependencia ${nombre} eliminada exitosamente`,
                  variant: "success",
                  autoClose: true,
                })
              );
            })
            .catch((error) => {
              console.error("Error al eliminar dependencia:", error);
              dispatch(
                openModal({
                  title: "Error",
                  message: "No se pudo eliminar la dependencia: " + error.message,
                  variant: "error",
                  autoClose: true,
                })
              );
            });
        },
        confirmText: "eliminar",
        cancelText: "cancelar",
      })
    );
  };

  const handleEditDependencia = (tienda: Tienda) => {
    setMenuOpen(null);

    const updateFormData = (newFormData: Partial<Tienda>) => {
      // Actualizamos la lista de tiendas con los datos enviados exitosamente
      setTiendas((prev) =>
        prev.map((t) => (t.idDependencia === tienda.idDependencia ? { ...t, ...newFormData } : t))
      );
    };

    dispatch(
      openModal({
        title: "Editar Dependencia",
        message: "",
        variant: "modalForms",
        autoClose: false,
        content: (
          <EditDependenciaForm
            tienda={tienda}
            onSave={updateFormData} // Pasamos la función para actualizar la lista tras el envío
          />
        ),
        extraClasses: "modalMedium modalLeft",
      })
    );
  };

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredTiendas = tiendas.filter((tienda) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (filterType === "all") {
      return Object.values(tienda).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    }
    return String(tienda[filterType]).toLowerCase().includes(query);
  });

  if (loading) return <p>Cargando tiendas...</p>;
  if (tiendas.length === 0) return <p>No hay tiendas registradas.</p>;

  return (
    <div className="containerDependencyClient">
      <div className="containerDependencyClient_header">
        <h3>Tiendas asociadas</h3>
        <FilterDependency
          onSearch={setSearchQuery}
          onFilterChange={setFilterType}
          idClient={idClient}
        />
      </div>

      {filteredTiendas.map((tienda) => (
        <div
          key={tienda.idDependencia}
          className="containerDependencyClient_cards"
        >
          <div className="containerDependencyClient_card">
            <p className="containerDependencyClient_card-local" id="numeroLocal">
              <strong>{highlightMatch(tienda.numLocal)}</strong>
              <span>N° Local</span>
            </p>
            <p className="containerDependencyClient_card-name">
              <strong>{highlightMatch(tienda.puntoVenta)}</strong>
              <span>Punto de Venta</span>
            </p>
            <p>
              <strong>{highlightMatch(tienda.direccion)}</strong>
              <span>Dirección</span>
            </p>
            <p>
              <strong>{highlightMatch(tienda.envio)}</strong>
              <span>Envío</span>
            </p>
            <p>
              <strong>{highlightMatch(tienda.tipoEstructura)}</strong>
              <span>Estructura</span>
            </p>
            <p>
              <strong>{highlightMatch(tienda.tamanoTienda)}</strong>
              <span>Tamaño Tienda</span>
            </p>
            <div className="card-actions">
              <button onClick={() => toggleDetails(tienda.idDependencia)}>
                Detalles
                <span>{expandedTienda === tienda.idDependencia ? "▲" : "▼"}</span>
              </button>
              <div className="menu-container">
                <span
                  className="menu-icon"
                  onClick={() =>
                    setMenuOpen((prev) =>
                      prev === tienda.idDependencia ? null : tienda.idDependencia
                    )
                  }
                >
                  <FaEllipsisV />
                </span>
                {menuOpen === tienda.idDependencia && (
                  <ul className="dropdown-menu">
                    <li>
                      <span onClick={() => handleEditDependencia(tienda)}>
                        <FaEdit /> Editar Dependencia
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() =>
                          handleDeleteDependencia(tienda.idDependencia, tienda.puntoVenta)
                        }
                      >
                        <FaTrash /> Eliminar Dependencia
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          {expandedTienda === tienda.idDependencia && (
            <DependencyDetails tienda={tienda} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DependencyClient;