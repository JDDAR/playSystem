import {
  CiudadEnum,
  EnviosEnum,
  HorarioEnum,
  PrioridadEnum,
  RegionEnum,
  TamanioEnum,
} from "./enums.model";

export interface Tienda {
  puntoVenta: string;
  direccion: string;
  antenas: string;
  area: string;
  banderinesExternos: string;
  cabezotes: string;
  cenefa: string;
  ciudad: CiudadEnum;
  clienteId: string;
  ent: string;
  envio: EnviosEnum;
  horario: HorarioEnum;
  instalador: string;
  numLocal: string;
  parqueadero: string;
  pendones: string;
  prioridad: PrioridadEnum;
  region: RegionEnum;
  tamanoTienda: TamanioEnum;
  tels: string;
  tipoEstructura: string;
  vinilosVidrios: string;
}
