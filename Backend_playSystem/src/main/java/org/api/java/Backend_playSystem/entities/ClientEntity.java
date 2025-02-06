
package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
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

  @ManyToOne
  @JoinColumn(name = "id_user")
  private User user;

  @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DependenciaEntity> dependencias;

}
