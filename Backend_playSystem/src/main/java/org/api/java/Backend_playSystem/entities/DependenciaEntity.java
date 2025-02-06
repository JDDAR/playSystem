package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;

import org.api.java.Backend_playSystem.enums.*;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dependencias")
public class DependenciaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "cliente_id", nullable = false)
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
