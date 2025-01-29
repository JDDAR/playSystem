import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/auth.service";
import { setUser } from "../../../features/user/userSlice";
import { PrivateRoutes } from "../../../router/routes";

//Estilos
import "./signingIn.scss";

const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

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

      switch (userData.user.role) {
        case "ADMINISTRATOR":
          navigate(
            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.ADMINDASHBOARD}`,
            {
              replace: true,
            },
          );
          break;
        case "MANAGER":
          navigate(
            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MANAGERDASHBOARD}`,
            { replace: true },
          );
          break;
        case "CLIENT":
          navigate(
            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.CLIENTDASHBOARD}`,
          );
          break;

        default:
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
    <div className="containerSigningIn">
      <div className="containerSigningIn__dateSignIn">{getCurrentDate()}</div>
      <div className="containerSigningIn__containerForm">
        <figure className="containerSigningIn__containerForm__figure">
          <img />
        </figure>
        <h1>¡Bienvenido!</h1>
        <form
          className="containerSigningIn__containerForm__Form"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </fieldset>
          <fieldset>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </fieldset>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
      <div>
        <p> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se</p>
      </div>
    </div>
  );
};

export default SigninIn;
