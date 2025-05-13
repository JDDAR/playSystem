package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Entity
@Table(name = "productos")
public class ProductEntity {

  @Id
  @Column(name = "codigoProducto", unique = true)
  private String idCodigoProducto;

  @Column(nullable = false)
  private String nombre;

  @Column(columnDefinition = "TEXT")
  private String caracteristicas;
}
