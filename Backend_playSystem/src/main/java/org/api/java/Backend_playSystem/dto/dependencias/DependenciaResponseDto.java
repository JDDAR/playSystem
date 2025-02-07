package org.api.java.Backend_playSystem.dto.dependencias;

import java.time.LocalDateTime;

import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.enums.*;

import lombok.Data;

@Data
public class DependenciaResponseDto {
  private String idDependencia;
  private String numLocal;
  private String puntoVenta;
  private String direccion;
  private LocalDateTime fechaCreacion;
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

  public DependenciaResponseDto(DependenciaEntity dependencia) {
    this.idDependencia = dependencia.getIdDependencia();
    this.numLocal = dependencia.getNumLocal();
    this.puntoVenta = dependencia.getPuntoVenta();
    this.direccion = dependencia.getDireccion();
    this.fechaCreacion = dependencia.getFechaCreacion();
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
  }
}
