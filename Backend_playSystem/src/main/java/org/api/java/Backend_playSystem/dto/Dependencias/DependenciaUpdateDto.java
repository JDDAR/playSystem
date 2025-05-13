package org.api.java.Backend_playSystem.dto.Dependencias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.api.java.Backend_playSystem.enums.CiudadEnum;
import org.api.java.Backend_playSystem.enums.EnvioEnum;
import org.api.java.Backend_playSystem.enums.HorarioEnum;
import org.api.java.Backend_playSystem.enums.PrioridadEnum;
import org.api.java.Backend_playSystem.enums.RegionEnum;
import org.api.java.Backend_playSystem.enums.TamanoTiendaEnum;
import org.api.java.Backend_playSystem.enums.TipoEstructuraEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DependenciaUpdateDto {
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