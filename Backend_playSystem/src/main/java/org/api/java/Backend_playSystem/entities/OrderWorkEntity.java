package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;

import org.api.java.Backend_playSystem.enums.EstadoOrderEnum;

@Data
@Getter
@Entity
@Table(name = "ordenes_trabajo")
public class OrderWorkEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String idOrderWork;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "proyecto_id", nullable = false)
  private ProyectoEntity proyecto;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "codigo_producto")
  private ProductEntity producto;

  private String nombreProductoPersonalizado;
  private String caracteristicasProductoPersonalizado;

  @Column(nullable = false)
  private Integer cantidad;

  @Enumerated(EnumType.STRING)
  private EstadoOrderEnum estadoOrden;

  @Column(nullable = false)
  private BigDecimal precioUnitario;

  @Column(nullable = false)
  private BigDecimal precioTotal;

}
