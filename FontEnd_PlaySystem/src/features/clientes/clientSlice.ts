
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
	id: string;
	nombreEmpresa: string;
	nit: string;
	telefonoContacto: string;
	emailContacto: string;
	direccionPrincipal: string;
	observaciones: string;
	descripcion: string;
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
}

interface ClientState {
	clients: Client[];
}

const initialState: ClientState = {
	clients: [],
};

const clientSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		setClients(state, action: PayloadAction<Client[]>) {
			state.clients = action.payload;
		},
		updateClient(state, action: PayloadAction<Client>) {
			const index = state.clients.findIndex((c) => c.id === action.payload.id);
			if (index !== -1) {
				state.clients[index] = action.payload;
			}
		},
		removeClient(state, action: PayloadAction<string>) {
			state.clients = state.clients.filter((c) => c.id !== action.payload);
		},
	},
});

export const { setClients, updateClient, removeClient } = clientSlice.actions;
export default clientSlice.reducer;