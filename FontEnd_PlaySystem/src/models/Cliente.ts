export interface Cliente {
  id: string;
  nombreEmpresa: string;
  descripcion: string;
  emailContacto: string;
  telefonoContacto: string;
  direccionPrincipal: string;
  nit: string;
  observaciones: string;
  user: {
    id: string;
    userName: string;
    email: string;
    role: {
      id: number;
      descripcion: string;
      name: string;
    };
  };
}
