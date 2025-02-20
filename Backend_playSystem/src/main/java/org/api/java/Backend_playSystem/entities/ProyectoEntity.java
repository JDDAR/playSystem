package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;
import java.util.List;

import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Entity
@Table(name = "proyectos")
public class ProyectoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String idProject;

  @Column(unique = true, nullable = false)
  private String numeroProyecto;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "cliente_id", nullable = false)
  private ClientEntity cliente;

  @Column(nullable = false)
  private LocalDateTime fechaCreacion = LocalDateTime.now();

  @Enumerated(EnumType.STRING)
  private EstadoProjectEnum estadoProjecto;

  @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<NoteProjectEntity> notas;

  @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderWorkEntity> ordenesTrabajo;

  @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DependencyProjectEntity> dependenciasAsociadas;
}
