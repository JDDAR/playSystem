import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { openModal, closeModal } from "../../../features/ui/uiSlice";
import api from "../../../services/api/api";
import { Tienda } from "../../../models/dependency.model";
import "./editDependenciaForm.scss";
import useEnums from "../../../services/api/enumsService";

interface EditDependenciaFormProps {
	tienda: Tienda;
	onSave: (formData: Partial<Tienda>) => void;
}

const EditDependenciaForm: React.FC<EditDependenciaFormProps> = ({ tienda, onSave }) => {
	const [formData, setFormData] = useState({
		numLocal: tienda.numLocal || "",
		puntoVenta: tienda.puntoVenta || "",
		direccion: tienda.direccion || "",
		tels: tienda.tels || "",
		instalador: tienda.instalador || "",
		ent: tienda.ent || "No",
		parqueadero: tienda.parqueadero || "No",
		cenefa: tienda.cenefa || "No",
		banderinesExternos: tienda.banderinesExternos || "No",
		vinilosVidrios: tienda.vinilosVidrios || "No",
		pendones: tienda.pendones || "No",
		antenas: tienda.antenas || "",
		cabezotes: tienda.cabezotes || "",
		area: tienda.area || "",
		horario: tienda.horario || "",
		ciudad: tienda.ciudad || "",
		region: tienda.region || "",
		prioridad: tienda.prioridad || "",
		envio: tienda.envio || "",
		tamanoTienda: tienda.tamanoTienda || "",
		tipoEstructura: tienda.tipoEstructura || "",
	});

	const token = useSelector((state: RootState) => state.user.token);
	const dispatch = useDispatch();

	const { data: horarios } = useEnums("horario");
	const { data: ciudades } = useEnums("ciudades");
	const { data: regiones } = useEnums("region");
	const { data: prioridades } = useEnums("prioridad");
	const { data: envios } = useEnums("envios");
	const { data: tamanos } = useEnums("tamano");
	const { data: estructuras } = useEnums("tipo");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			const updatedFormData = { ...prev, [name]: value };
			return updatedFormData;
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await api.put(`/dependencias/${tienda.idDependencia}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			dispatch(
				openModal({
					title: "Éxito",
					message: `Dependencia ${response.data.puntoVenta || response.data.idDependencia} actualizada exitosamente.`,
					variant: "success",
					autoClose: true,
				})
			);
			onSave(response.data); // Actualizamos la lista en el padre
			dispatch(closeModal());
		} catch (error) {
			console.error("Error al actualizar dependencia:", error);
			dispatch(
				openModal({
					title: "Error",
					message: "No se pudo actualizar la dependencia: " + error,
					variant: "error",
					autoClose: true,
				})
			);
		}
	};

	return (
		<div className="containerEditDependenciaForm">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Información Básica</legend>
					<label>
						Número Local:
						<input
							type="text"
							name="numLocal"
							value={formData.numLocal}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Punto de Venta:
						<input
							type="text"
							name="puntoVenta"
							value={formData.puntoVenta}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Dirección:
						<input
							type="text"
							name="direccion"
							value={formData.direccion}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Teléfonos:
						<input
							type="text"
							name="tels"
							value={formData.tels}
							onChange={handleChange}
						/>
					</label>
				</fieldset>

				<fieldset>
					<legend>Detalles de Instalación</legend>
					<label>
						Instalador:
						<input
							type="text"
							name="instalador"
							value={formData.instalador}
							onChange={handleChange}
						/>
					</label>
					<label>
						Entrega:
						<input
							type="text"
							name="ent"
							value={formData.ent}
							onChange={handleChange}
						/>
					</label>
					<label>
						Parqueadero:
						<input
							type="text"
							name="parqueadero"
							value={formData.parqueadero}
							onChange={handleChange}
						/>
					</label>
					<label>
						Cenefa:
						<input
							type="text"
							name="cenefa"
							value={formData.cenefa}
							onChange={handleChange}
						/>
					</label>
				</fieldset>

				<fieldset>
					<legend>Elementos Visuales</legend>
					<label>
						Banderines Externos:
						<input
							type="text"
							name="banderinesExternos"
							value={formData.banderinesExternos}
							onChange={handleChange}
						/>
					</label>
					<label>
						Vinilos Vidrios:
						<input
							type="text"
							name="vinilosVidrios"
							value={formData.vinilosVidrios}
							onChange={handleChange}
						/>
					</label>
					<label>
						Pendones:
						<input
							type="text"
							name="pendones"
							value={formData.pendones}
							onChange={handleChange}
						/>
					</label>
					<label>
						Antenas:
						<input
							type="text"
							name="antenas"
							value={formData.antenas}
							onChange={handleChange}
						/>
					</label>
					<label>
						Cabezotes:
						<input
							type="text"
							name="cabezotes"
							value={formData.cabezotes}
							onChange={handleChange}
						/>
					</label>
				</fieldset>

				<fieldset>
					<legend>Otros Detalles</legend>
					<label>
						Área:
						<input
							type="text"
							name="area"
							value={formData.area}
							onChange={handleChange}
						/>
					</label>
					<label>
						Horario:
						<select name="horario" value={formData.horario} onChange={handleChange} required>
							<option value="">Seleccione Horario</option>
							{horarios.map((h) => (
								<option key={h} value={h}>
									{h}
								</option>
							))}
						</select>
					</label>
					<label>
						Ciudad:
						<select name="ciudad" value={formData.ciudad} onChange={handleChange} required>
							<option value="">Seleccione Ciudad</option>
							{ciudades.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</label>
					<label>
						Región:
						<select name="region" value={formData.region} onChange={handleChange} required>
							<option value="">Seleccione Región</option>
							{regiones.map((r) => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</select>
					</label>
					<label>
						Prioridad:
						<select name="prioridad" value={formData.prioridad} onChange={handleChange} required>
							<option value="">Seleccione Prioridad</option>
							{prioridades.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
					</label>
					<label>
						Envío:
						<select name="envio" value={formData.envio} onChange={handleChange} required>
							<option value="">Seleccione Envío</option>
							{envios.map((e) => (
								<option key={e} value={e}>
									{e}
								</option>
							))}
						</select>
					</label>
					<label>
						Tamaño Tienda:
						<select name="tamanoTienda" value={formData.tamanoTienda} onChange={handleChange} required>
							<option value="">Seleccione Tamaño</option>
							{tamanos.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					</label>
					<label>
						Tipo Estructura:
						<select name="tipoEstructura" value={formData.tipoEstructura} onChange={handleChange} required>
							<option value="">Seleccione Tipo de Estructura</option>
							{estructuras.map((te) => (
								<option key={te} value={te}>
									{te}
								</option>
							))}
						</select>
					</label>
				</fieldset>

				<div className="form-buttons">
					<button type="submit" className="confirm-button">
						Confirmar Cambios
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditDependenciaForm;