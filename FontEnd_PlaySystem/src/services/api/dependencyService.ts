import { AxiosError } from "axios";
import { Tienda } from "../../models/dependency.model";
import api from "./api";

export const agregarDependencia = async (
  idClient: string,
  data: Tienda,
  token: string,
): Promise<Tienda> => {
  try {
    const response = await api.post<Tienda>(
      `/dependencias/${idClient}/agregar`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Error desconocido";
    throw new Error(message || "Error al agregar dependencia");
  }
};
