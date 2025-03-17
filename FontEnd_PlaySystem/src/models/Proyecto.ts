import { Tienda } from "./dependency.model";
export interface ProyectoResponse {
	idProject: string;
	numeroProyecto: string;
	clienteNombre: string;
	fechaCreacion: string;
	estadoProyecto: string;
	dependencias: Tienda[];
}