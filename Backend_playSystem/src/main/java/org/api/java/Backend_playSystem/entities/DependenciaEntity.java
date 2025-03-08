package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;

import org.api.java.Backend_playSystem.enums.CiudadEnum;
import org.api.java.Backend_playSystem.enums.EnvioEnum;
import org.api.java.Backend_playSystem.enums.HorarioEnum;
import org.api.java.Backend_playSystem.enums.PrioridadEnum;
import org.api.java.Backend_playSystem.enums.RegionEnum;
import org.api.java.Backend_playSystem.enums.TamanoTiendaEnum;
import org.api.java.Backend_playSystem.enums.TipoEstructuraEnum;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "dependencias")
public class DependenciaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String idDependencia;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "cliente_id", nullable = false)
  @JsonBackReference
  private ClientEntity cliente;

  @Column(nullable = false)
  private String numLocal;

  @Column(nullable = false)
  private String puntoVenta;

  @Column(nullable = false)
  private String direccion;

  @Column(name = "fechaCreacion", updatable = false)
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

  @Enumerated(EnumType.STRING)
  private HorarioEnum horario;

  @Enumerated(EnumType.STRING)
  private CiudadEnum ciudad;

  @Enumerated(EnumType.STRING)
  private RegionEnum region;

  @Enumerated(EnumType.STRING)
  private PrioridadEnum prioridad;

  @Enumerated(EnumType.STRING)
  private EnvioEnum envio;

  @Enumerated(EnumType.STRING)
  private TamanoTiendaEnum tamanoTienda;

  @Enumerated(EnumType.STRING)
  private TipoEstructuraEnum tipoEstructura;
}
