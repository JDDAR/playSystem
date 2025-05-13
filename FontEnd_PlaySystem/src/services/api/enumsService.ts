import { useEffect, useState } from "react";
import api from "./api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const useEnums = (endpoint: string) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/enums/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log("Error al cargar los enums", error);
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  return { data, loading, error };
};

export default useEnums;
