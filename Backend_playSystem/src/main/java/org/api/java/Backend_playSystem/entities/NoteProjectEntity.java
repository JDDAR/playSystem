package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
@Getter
@Entity
@Table(name = "notas_proyecto")
public class NoteProjectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String idNoteProject;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String contenido;

  @Column(nullable = false)
  private LocalDateTime fechaCreacion = LocalDateTime.now();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "proyecto_id", nullable = false)
  private ProyectoEntity proyecto;
}
