package org.api.java.Backend_playSystem.dto.Dependencias;

import java.time.LocalDateTime;

import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.enums.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DependenciaRequestDto {
  private String idDependencia;
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
  private String clienteId;
  private HorarioEnum horario;
  private CiudadEnum ciudad;
  private RegionEnum region;
  private PrioridadEnum prioridad;
  private EnvioEnum envio;
  private TamanoTiendaEnum tamanoTienda;
  private TipoEstructuraEnum tipoEstructura;

  // Constructor con todos los campos
  public DependenciaRequestDto(
      String idDependencia, String numLocal, String puntoVenta, String direccion, String clienteId,
      String tels, String instalador, String ent, String parqueadero, String cenefa,
      String banderinesExternos, String vinilosVidrios, String pendones, String antenas,
      String cabezotes, String area, HorarioEnum horario, CiudadEnum ciudad, RegionEnum region,
      PrioridadEnum prioridad, EnvioEnum envio, TamanoTiendaEnum tamanoTienda,
      TipoEstructuraEnum tipoEstructura, LocalDateTime fechaCreacion) {
    this.idDependencia = idDependencia;
    this.numLocal = numLocal;
    this.puntoVenta = puntoVenta;
    this.direccion = direccion;
    this.tels = tels;
    this.instalador = instalador;
    this.ent = ent;
    this.parqueadero = parqueadero;
    this.cenefa = cenefa;
    this.banderinesExternos = banderinesExternos;
    this.vinilosVidrios = vinilosVidrios;
    this.pendones = pendones;
    this.antenas = antenas;
    this.cabezotes = cabezotes;
    this.area = area;
    this.clienteId = clienteId;
    this.horario = horario;
    this.ciudad = ciudad;
    this.region = region;
    this.prioridad = prioridad;
    this.envio = envio;
    this.tamanoTienda = tamanoTienda;
    this.tipoEstructura = tipoEstructura;
  }

  // Constructor que recibe una entidad
  public DependenciaRequestDto(DependenciaEntity dependencia) {
    this.numLocal = dependencia.getNumLocal();
    this.puntoVenta = dependencia.getPuntoVenta();
    this.direccion = dependencia.getDireccion();
    this.tels = dependencia.getTels();
    this.instalador = dependencia.getInstalador();
    this.ent = dependencia.getEnt();
    this.parqueadero = dependencia.getParqueadero();
    this.cenefa = dependencia.getCenefa();
    this.banderinesExternos = dependencia.getBanderinesExternos();
    this.vinilosVidrios = dependencia.getVinilosVidrios();
    this.pendones = dependencia.getPendones();
    this.antenas = dependencia.getAntenas();
    this.cabezotes = dependencia.getCabezotes();
    this.area = dependencia.getArea();
    this.horario = dependencia.getHorario();
    this.ciudad = dependencia.getCiudad();
    this.region = dependencia.getRegion();
    this.prioridad = dependencia.getPrioridad();
    this.envio = dependencia.getEnvio();
    this.tamanoTienda = dependencia.getTamanoTienda();
    this.tipoEstructura = dependencia.getTipoEstructura();
    this.clienteId = dependencia.getCliente().getId();
  }
}
