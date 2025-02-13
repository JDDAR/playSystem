import { useState } from "react";
import { Tienda } from "../../../models/dependency.model";
import "./filterDependency.scss";
import NewdependencyButton from "../../NewdependencyButton/NewDependencyButton";

interface FilterDependencyProps {
  onSearch: (query: string) => void;
  onFilterChange: (filterType: keyof Tienda | "all") => void;
  idClient: string;
}

const FilterDependency = ({
  onSearch,
  onFilterChange,
  idClient, // Recibir el idClient
}: FilterDependencyProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<keyof Tienda | "all">(
    "all",
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof Tienda | "all";
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="containerFilter">
      <div className="containerFilter_search">
        <input
          type="text"
          placeholder="Buscar en todas las dependencias..."
          value={localSearch}
          onChange={handleSearchChange}
        />
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="all">Todos los campos</option>
          <option value="puntoVenta">Nombre del punto de venta</option>
          <option value="ciudad">Ciudad</option>
          <option value="prioridad">Prioridad</option>
          <option value="tamanoTienda">Tamaño de tienda</option>
          <option value="tipoEstructura">Tipo de estructura</option>
          <option value="envio">Estado de envío</option>
          <option value="region">Región</option>
        </select>
        {/* Usar el componente NewTiendaButton */}
        <NewdependencyButton idClient={idClient} />
      </div>
    </div>
  );
};

export default FilterDependency;
