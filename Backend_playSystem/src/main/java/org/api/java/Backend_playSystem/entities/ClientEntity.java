
package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String nombreEmpresa;

  @Column(nullable = false)
  private String nit;

  @Column(name = "fechaCreacion", updatable = false)
  private LocalDateTime fechaCreacion;

  private String telefonoContacto;
  private String emailContacto;
  private String direccionPrincipal;
  private String observaciones;
  private String descripcion;

  @OneToOne
  @JoinColumn(name = "id_user")
  private User user;

  @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore // Evitar serializar las dependencias
  private List<DependenciaEntity> dependencias;

}
