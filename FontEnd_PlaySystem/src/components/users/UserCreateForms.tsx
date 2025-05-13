import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import api from "../../services/api/api";
import { RoleEnum } from "../../models/enums.model";
import useEnums from "../../services/api/enumsService";
import ClientCreateForm from "../clientCreateForm/ClientCreateForm";

import "./userCreateForms.scss";

interface UserFormValues {
  userName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  identificationNumber: string;
  documentType: string;
  idRol: number; // Cambiado a number para coincidir con el backend
}

interface CreatedUser {
  id: string;
  userName: string;
  role: RoleEnum;
}

const UserCreateForms = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const { data: roles } = useEnums("role");
  const { data: documentTypes } = useEnums("documento");

  const [formData, setFormData] = useState<UserFormValues>({
    userName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    identificationNumber: "",
    documentType: "",
    idRol: 0,
  });

  const [createdUser, setCreatedUser] = useState<CreatedUser | null>(null);
  const [showClientForm, setShowClientForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "idRol" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Parsear la cadena de texto para extraer los datos
      const responseText = response.data;
      const idMatch = responseText.match(/ID: (.+)/);
      const nameMatch = responseText.match(/Nombre: (.+)/);
      const roleMatch = responseText.match(/Rol: (.+)/);

      if (idMatch && nameMatch && roleMatch) {
        const userId = idMatch[1].trim();
        const userName = nameMatch[1].trim();
        const userRole = roleMatch[1].trim();

        console.log("Usuario creado exitosamente:");
        console.log("ID:", userId);
        console.log("Nombre:", userName);
        console.log("Rol:", userRole);

        // Guardar los datos del usuario creado
        setCreatedUser({
          id: userId,
          userName: userName,
          role: userRole as RoleEnum, // Asegurar que el tipo sea RoleEnum
        });

        // Validar el rol del usuario creado
        if (userRole === "CLIENT") {
          setShowClientForm(true); // Mostrar el formulario de cliente
        } else {
          // Si el rol no es CLIENT, simplemente reiniciamos el formulario
          setFormData({
            userName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            identificationNumber: "",
            documentType: "",
            idRol: 0,
          });
          // Aquí puedes manejar otros roles si es necesario
        }
      } else {
        console.error("No se pudo extraer la información del usuario creado.");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      dispatch(
        openModal({
          title: "Error",
          message: "No se pudo crear el usuario",
          variant: "error",
          autoClose: true,
        }),
      );
    }
  };

  return (
    <div>
      {!showClientForm ? (
        <form onSubmit={handleSubmit} className="containerUserForm">
          {/* Formulario de creación de usuario */}
          <fieldset>
            <legend>Información Básica</legend>
            <label>
              Nombre de usuario:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Apellidos:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Teléfono:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Datos de Seguridad</legend>

            <label>
              Tipo de documento:
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                {documentTypes?.map((docType, index) => (
                  <option key={index} value={docType}>
                    {docType}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Número de documento:
              <input
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Rol del Usuario</legend>
            <label>
              Rol:
              <select
                name="idRol"
                value={formData.idRol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol</option>
                {roles?.map((role, index) => (
                  <option key={index} value={index + 1}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <button type="submit" className="submit-button">
            Siguiente
          </button>
        </form>
      ) : (
        <ClientCreateForm
          userId={createdUser?.id || ""}
          userName={createdUser?.userName || ""}
        />
      )}
    </div>
  );
};

export default UserCreateForms;
