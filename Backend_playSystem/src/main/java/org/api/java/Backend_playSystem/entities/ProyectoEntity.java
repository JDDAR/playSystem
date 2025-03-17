package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "proyectos")
public class ProyectoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id_project", updatable = false, nullable = false)
  private String idProject;

  @Column(nullable = false, unique = true)
  private String numeroProyecto;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cliente_id", nullable = false)
  private ClientEntity cliente;

  @Column(nullable = false)
  private LocalDateTime fechaCreacion;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EstadoProjectEnum estadoProyecto;

  @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DependencyProjectEntity> dependenciasAsociadas;
}