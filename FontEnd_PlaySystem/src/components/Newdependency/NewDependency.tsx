import { useState } from "react";
import "./newDependency.scss";
import useEnums from "../../services/api/enumsService";
import api from "../../services/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/ui/uiSlice";



interface NewDependencyProps {
  idClient: string;
  nombreEmpresa: string;
  onTiendaAdded?: () => void;
}

const NewDependency = ({ idClient, onTiendaAdded }: NewDependencyProps) => {
  const token = useSelector((state: RootState) => state.user.token); // Obtener token desde Redux
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    numLocal: "",
    puntoVenta: "",
    direccion: "",
    tels: "",
    instalador: "",
    ent: "No",
    parqueadero: "No",
    cenefa: "No",
    banderinesExternos: "No",
    vinilosVidrios: "No",
    pendones: "No",
    antenas: "",
    cabezotes: "",
    area: "",
    clienteId: idClient,
    horario: "",
    ciudad: "",
    region: "",
    prioridad: "",
    envio: "",
    tamanoTienda: "",
    tipoEstructura: "",
  });

  // Obtener los enums
  const { data: horarios } = useEnums("horario");
  const { data: ciudades } = useEnums("ciudades");
  const { data: regiones } = useEnums("region");
  const { data: prioridades } = useEnums("prioridad");
  const { data: envios } = useEnums("envios");
  const { data: tamanos } = useEnums("tamano");
  const { data: estructuras } = useEnums("tipo");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Datos del formulario:", formData);

    try {
      const response = await api.post(
        `/dependencias/${idClient}/agregar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      dispatch(
        openModal({
          title: "¡ÉXITO!",
          message: `Dependencia ${response.data.nombre || response.data.id} creada`,
          variant: "success",
          autoClose: true,
          cancelText: "x",
        }),
      );
      if (onTiendaAdded) onTiendaAdded();
    } catch (error) {
      console.log("Error al crear la dependencia", error);
      dispatch(
        openModal({
          title: "Error",
          message: "No se pudo crear la dependencia",
          variant: "error",
          autoClose: true,
        }),
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="containerForms">
        <div className="containerForms_contacto">
          <fieldset>
            <label>N° local
              <input
                type="text"
                name="numLocal"
                placeholder="Número Local"
                onChange={handleChange}
                required
              />
            </label>
            <label>Punto de Venta
              <input
                type="text"
                name="puntoVenta"
                placeholder="Punto de Venta"
                onChange={handleChange}
                required
              />
            </label>
            <label>Dirección
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label>Telefono
              <input
                type="text"
                name="tels"
                placeholder="Teléfonos"
                onChange={handleChange}
                required
              />
            </label>
            <label>Horario
              <select name="horario" onChange={handleChange} required>
                <option value="">Seleccione Horario</option>
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </label>
            <label>Ciudad

              <select name="ciudad" onChange={handleChange} required>
                <option value="">Seleccione Ciudad</option>
                {ciudades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>Región
              <select name="region" onChange={handleChange} required>
                <option value="">Seleccione Región</option>
                {regiones.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        </div>

        <div className="containerForms_features">
          <fieldset>
            <label>Antenas
              <input
                type="text"
                name="antenas"
                placeholder="Antenas"
                onChange={handleChange}
                required
              />
            </label>

            <label>Cabezotes
              <input
                type="text"
                name="cabezotes"
                placeholder="Cabezotes"
                onChange={handleChange}
                required
              />
            </label>

            <label>Área
              <input
                type="text"
                name="area"
                placeholder="Área"
                onChange={handleChange}
                required
              />
            </label>

            <label>Tamaño Tienda
              <select name="tamanoTienda" onChange={handleChange} required>
                <option value="">Seleccione Tamaño</option>
                {tamanos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        </div>
        <div className="containerForms_advertising">
          <fieldset>
            <label>Instalador
              <input
                type="text"
                name="instalador"
                placeholder="Instalador"
                onChange={handleChange}
                required
              />
            </label>

            <label>Tipo de Estructura
              <select name="tipoEstructura" onChange={handleChange} required>
                <option value="">Seleccione Tipo de Estructura</option>
                {estructuras.map((te) => (
                  <option key={te} value={te}>
                    {te}
                  </option>
                ))}
              </select>
            </label>

            <label>Prioridad
              <select name="prioridad" onChange={handleChange} required>
                <option value="">Seleccione Prioridad</option>
                {prioridades.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label>Punto de Venta
              <select name="envio" onChange={handleChange} required>
                <option value="">Seleccione Envío</option>
                {envios.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        </div>
        <button type="submit">Agregar</button>
      </form>
    </>
  );
};

export default NewDependency;
