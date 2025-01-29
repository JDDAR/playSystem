const baseUrl = "http://localhost:9091/api/";
const loginUrl = `${baseUrl}login`;

export interface UserResponse {
  token: string;
  user: {
    id: string;
    userName: string;
    role: string;
  };
}

export const login = async (
  userName: string,
  password: string,
): Promise<UserResponse> => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    //Validamos la respuesta exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}:${response.statusText}`);
    }

    //Obtenemos los datos en formato json
    const data: UserResponse = await response.json();

    //Retornamos los datos completos del usuario
    return data;
  } catch (error) {
    console.log("Error al iniciar sesión: ", error);
    throw error;
  }
};
