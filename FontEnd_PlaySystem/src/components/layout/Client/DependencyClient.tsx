import React, { useEffect, useState } from "react";
import api from "../../../services/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import "./dependencyClient.scss";
import { Tienda } from "../../../models/dependency.model";
import DependencyDetails from "../../dependencyDetails/DependencyDetails";
import FilterDependency from "./FilterDependency";

interface DependencyClientProps {
  idClient: string;
}

const DependencyClient: React.FC<DependencyClientProps> = ({ idClient }) => {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTienda, setExpandedTienda] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<keyof Tienda | "all">("all");

  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (!idClient) return;
    const fetchDependency = async () => {
      try {
        const response = await api.get(`/dependencias/${idClient}/tiendas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Función para resaltar coincidencias en el texto
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
      ),
    );
  };

  // Filtrado de tiendas según el texto ingresado
  const filteredTiendas = tiendas.filter((tienda) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    if (filterType === "all") {
      return Object.values(tienda).some((value) =>
        String(value).toLowerCase().includes(query),
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
            <p
              id="numeroLocal"
              className="containerDependencyClient_card-local"
            >
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
            <button onClick={() => toggleDetails(tienda.idDependencia)}>
              Detalles
              <span>{expandedTienda === tienda.idDependencia ? "▲" : "▼"}</span>
            </button>
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
