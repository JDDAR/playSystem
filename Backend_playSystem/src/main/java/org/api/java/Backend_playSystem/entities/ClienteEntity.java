
package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clientes")
public class ClienteEntity {

  @Id
  private Long id;

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

  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "idUser", nullable = false)
  private User user;
}
