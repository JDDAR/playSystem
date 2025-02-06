package org.api.java.Backend_playSystem.dto.Dependencias;

import org.api.java.Backend_playSystem.enums.*;
import lombok.Data;

@Data
public class DependenciaRequestDto {
  private String numLocal;
  private String puntoVenta;
  private String direccion;
  private String tels;
  private String instalador;
  private String ent;
  private String parqueadero;
  private String cenefa;
  private String banderinesExternos;
  private String vinilosVidrios;
  private String pendones;
  private String antenas;
  private String cabezotes;
  private String area;
  private HorarioEnum horario;
  private CiudadEnum ciudad;
  private RegionEnum region;
  private PrioridadEnum prioridad;
  private EnvioEnum envio;
  private TamanoTiendaEnum tamanoTienda;
  private TipoEstructuraEnum tipoEstructura;
}
