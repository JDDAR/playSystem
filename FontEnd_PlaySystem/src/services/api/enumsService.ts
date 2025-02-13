import api from "./api";

export const getCiudades = async () => {
  try {
    const response = await api.get("/enums/ciudades");
    return response.data; // Asume que la API devuelve un array de ciudades
  } catch (error) {
    console.error("Error fetching ciudades:", error);
    throw error;
  }
};
