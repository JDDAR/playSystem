package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "dependencias_proyecto")
public class DependencyProjectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String idProjectDependency;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "proyecto_id", nullable = false)
  private ProyectoEntity proyecto;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "dependencia_id", nullable = false)
  private DependenciaEntity dependencia; // Tipo DependenciaEntity
}
