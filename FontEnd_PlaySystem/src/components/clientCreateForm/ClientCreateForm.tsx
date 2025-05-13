import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import api from "../../services/api/api";
import NewDependency from "../Newdependency/NewDependency";

import "./crientCreateForm.scss";

interface ClientCreateFormProps {
  userId: string;
  userName: string;
}

const ClientCreateForm = ({ userId, userName }: ClientCreateFormProps) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const [clientData, setClientData] = useState({
    nombreEmpresa: "",
    nit: "",
    telefonoContacto: "",
    emailContacto: "",
    direccionPrincipal: "",
    observaciones: "",
    descripcion: "",
    userId,
  });

  const [createdClientId, setCreatedClientId] = useState<string | null>(null);
  const [showDependencyForm, setShowDependencyForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, withDependency: boolean) => {
    e.preventDefault();

    try {
      const response = await api.post("/clientes/crearCliente", clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCreatedClientId(response.data.id); // Guardar el ID del cliente creado

      if (withDependency) {
        setShowDependencyForm(true); // Mostrar el formulario de dependencia
      } else {
        // Mostrar modal de éxito
        dispatch(
          openModal({
            title: "Éxito",
            message: "Cliente creado exitosamente.",
            variant: "success",
            autoClose: true,
          }),
        );
      }
    } catch (error) {
      console.error("Error al crear cliente:", error);
      dispatch(
        openModal({
          title: "Error",
          message: "No se pudo crear el cliente",
          variant: "error",
          autoClose: true,
        }),
      );
    }
  };

  return (
    <div className="containerClientForm">
      {!showDependencyForm ? (
        <form onSubmit={(e) => handleSubmit(e, false)} className="client-form">
          <div className="containerClientForm_headerForm">
            <legend>Registrar Cliente</legend>
            <p>
              <strong>Asignando cliente a : </strong> {userName}
            </p>
          </div>
          <fieldset>

            <label>
              Nombre de la Empresa:
              <input
                type="text"
                name="nombreEmpresa"
                value={clientData.nombreEmpresa}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              NIT:
              <input
                type="text"
                name="nit"
                value={clientData.nit}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Contacto principal</legend>
            <label>
              Teléfono de Contacto:
              <input
                type="tel"
                name="telefonoContacto"
                value={clientData.telefonoContacto}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email de Contacto:
              <input
                type="email"
                name="emailContacto"
                value={clientData.emailContacto}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Dirección Principal:
              <input
                type="text"
                name="direccionPrincipal"
                value={clientData.direccionPrincipal}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Mas datos</legend>
            <label>
              Observaciones:
              <textarea
                name="observaciones"
                value={clientData.observaciones}
                onChange={handleChange}
              />
            </label>

            <label>
              Descripción:
              <textarea
                name="descripcion"
                value={clientData.descripcion}
                onChange={handleChange}
              />
            </label>

          </fieldset>
          <div className="containerClientForm_buttons">

            <button type="submit">Guardar sin agregar dependencia</button>
            <button type="button" onClick={(e) => handleSubmit(e, true)}>
              Agregar dependencia
            </button>
          </div>
        </form>
      ) : (
        <NewDependency
          idClient={createdClientId!}
          nombreEmpresa={clientData.nombreEmpresa}
        />
      )}
    </div>
  );
};

export default ClientCreateForm;
