import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import api from "../../services/api/api";
import useEnums from "../../services/api/enumsService";
import "./userEditForm.scss";

interface UserEditFormProps {
	user: {
		id: string;
		userName: string;
		lastName: string;
		email: string;
		phone: string;
		address: string;
		identificationNumber: string;
		documentType: string;
		role: { id: number; name: string };
	};
	client?: {
		id: string;
		nombreEmpresa: string;
		nit: string;
		telefonoContacto: string;
		emailContacto: string;
		direccionPrincipal: string;
		observaciones: string;
		descripcion: string;
	} | null;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, client }) => {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.user.token);
	const { data: documentTypes } = useEnums("documento");
	const { data: roles } = useEnums("role");

	const [userData, setUserData] = useState({
		userName: user.userName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone,
		address: user.address,
		identificationNumber: user.identificationNumber,
		documentType: user.documentType,
		idRol: user.role.id,
	});

	const [clientData, setClientData] = useState(
		client
			? {
				nombreEmpresa: client.nombreEmpresa,
				nit: client.nit,
				telefonoContacto: client.telefonoContacto,
				emailContacto: client.emailContacto,
				direccionPrincipal: client.direccionPrincipal,
				observaciones: client.observaciones,
				descripcion: client.descripcion,
			}
			: null
	);

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setUserData((prev) => ({
			...prev,
			[name]: name === "idRol" ? parseInt(value, 10) : value,
		}));
	};

	const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setClientData((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Actualizar usuario
			const userUpdateData = {
				userName: userData.userName,
				lastName: userData.lastName,
				email: userData.email,
				phone: userData.phone,
				address: userData.address,
				identificationNumber: userData.identificationNumber,
				documentType: userData.documentType,
				idRol: userData.idRol,
			};
			console.log("Datos enviados a PUT /users:", userUpdateData); // Depurar
			await api.put(`/users/${user.id}`, userUpdateData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			// Actualizar cliente si existe
			if (clientData && client) {
				const clientUpdateData = {
					nombreEmpresa: clientData.nombreEmpresa,
					nit: clientData.nit,
					telefonoContacto: clientData.telefonoContacto,
					emailContacto: clientData.emailContacto,
					direccionPrincipal: clientData.direccionPrincipal,
					observaciones: clientData.observaciones,
					descripcion: clientData.descripcion,
				};
				console.log("Datos enviados a PUT /clientes:", clientUpdateData); // Depurar
				await api.put(`/clientes/${client.id}`, clientUpdateData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
			}

			dispatch(
				openModal({
					title: "Éxito",
					message: "Usuario y cliente actualizados exitosamente.",
					variant: "success",
					autoClose: true,
				})
			);
		} catch (error) {
			console.error("Error al actualizar:", error);

			dispatch(
				openModal({
					title: "Error",
					message: "No se pudo actualizar el usuario o cliente: " + error,
					variant: "error",
					autoClose: true,
				})
			);
		}
	};

	return (
		<div className="containerUserEditForm">
			<form onSubmit={handleSubmit} className="user-edit-form">
				<fieldset>
					<legend>Información Básica del Usuario</legend>
					<label>
						Nombre de usuario:
						<input type="text" name="userName" value={userData.userName} onChange={handleUserChange} required />
					</label>
					<label>
						Apellidos:
						<input type="text" name="lastName" value={userData.lastName} onChange={handleUserChange} required />
					</label>
					<label>
						Correo electrónico:
						<input type="email" name="email" value={userData.email} onChange={handleUserChange} required />
					</label>
					<label>
						Teléfono:
						<input type="tel" name="phone" value={userData.phone} onChange={handleUserChange} required />
					</label>
				</fieldset>

				<fieldset>
					<legend>Datos de Identificación</legend>
					<label>
						Tipo de documento:
						<select name="documentType" value={userData.documentType} onChange={handleUserChange} required>
							<option value="">Seleccione un tipo</option>
							{documentTypes?.map((docType, index) => (
								<option key={index} value={docType}>{docType}</option>
							))}
						</select>
					</label>
					<label>
						Número de documento:
						<input type="text" name="identificationNumber" value={userData.identificationNumber} onChange={handleUserChange} required />
					</label>
				</fieldset>

				<fieldset>
					<legend>Rol y Dirección</legend>
					<label>
						Rol:
						<select name="idRol" value={userData.idRol} onChange={handleUserChange} required>
							<option value="">Seleccione un rol</option>
							{roles?.map((role, index) => (
								<option key={index} value={index + 1}>{role}</option>
							))}
						</select>
					</label>
					<label>
						Dirección:
						<input type="text" name="address" value={userData.address} onChange={handleUserChange} />
					</label>
				</fieldset>

				{clientData && (
					<>
						<fieldset>
							<div className="containerClientForm_headerForm">
								<legend>Información del Cliente</legend>
								<p><strong>Editando cliente asignado a: </strong> {userData.userName}</p>
							</div>
							<label>
								Nombre de la Empresa:
								<input type="text" name="nombreEmpresa" value={clientData.nombreEmpresa} onChange={handleClientChange} required />
							</label>
							<label>
								NIT:
								<input type="text" name="nit" value={clientData.nit} onChange={handleClientChange} required />
							</label>
						</fieldset>
						<fieldset>
							<legend>Contacto Principal</legend>
							<label>
								Teléfono de Contacto:
								<input type="tel" name="telefonoContacto" value={clientData.telefonoContacto} onChange={handleClientChange} required />
							</label>
							<label>
								Email de Contacto:
								<input type="email" name="emailContacto" value={clientData.emailContacto} onChange={handleClientChange} required />
							</label>
							<label>
								Dirección Principal:
								<input type="text" name="direccionPrincipal" value={clientData.direccionPrincipal} onChange={handleClientChange} required />
							</label>
						</fieldset>
						<fieldset>
							<legend>Más Datos</legend>
							<label>
								Observaciones:
								<textarea name="observaciones" value={clientData.observaciones} onChange={handleClientChange} />
							</label>
							<label>
								Descripción:
								<textarea name="descripcion" value={clientData.descripcion} onChange={handleClientChange} />
							</label>
						</fieldset>
					</>
				)}

				<button type="submit" className="submit-button">Guardar cambios</button>
			</form>
		</div>
	);
};

export default UserEditForm;