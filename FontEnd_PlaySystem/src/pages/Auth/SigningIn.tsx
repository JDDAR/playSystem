import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/auth.service";
import { setUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../router/routes";

const SigninIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      //Utilizamos el servicio del login
      const userData = await login(username, password);
      dispatch(setUser(userData));

      if (userData.user.role === "ADMIN") {
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.ADMINDASHBOARD}`, {
          replace: true,
        });
      } else if (userData.user.role === "CLIENT") {
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.CLIENTDASHBOARD}`);
      } else {
        console.log("Rol no reconocido: ", userData.user.role);
        setError("Rol No valido. Conecte con soporte ...");
      }
      console.log("Inicio de sesión exitoso. Datos de usuario:", userData);
    } catch (error) {
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales." +
          error,
      );
    }
  };
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default SigninIn;
