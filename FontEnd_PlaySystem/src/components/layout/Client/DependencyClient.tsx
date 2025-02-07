import React, { useEffect, useState } from "react";
import api from "../../../services/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

// Definir el tipo de Tienda
interface Tienda {
  id: string;
  puntoVenta: string;
  direccion: string;
}

// Definir los props del componente
interface DependencyClientProps {
  idClient: string;
}

const DependencyClient: React.FC<DependencyClientProps> = ({ idClient }) => {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.log("Respuesta del Back Dependecias: ", response.data);
        setTiendas(response.data);
      } catch (error) {
        console.error(
          "Error al obtener la lista de Dependencias ... : ",
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDependency();
  }, [token, idClient]);

  if (loading) return <p>Cargando tiendas...</p>;
  if (tiendas.length === 0) return <p>No hay tiendas registradas.</p>;

  return (
    <div>
      <h3>Tiendas Asociadas</h3>
      <ul>
        {tiendas.map((tienda) => (
          <li key={tienda.id}>
            <strong>{tienda.puntoVenta}</strong> - {tienda.direccion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DependencyClient;
