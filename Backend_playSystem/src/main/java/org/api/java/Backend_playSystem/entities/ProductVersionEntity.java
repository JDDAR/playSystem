package org.api.java.Backend_playSystem.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos_versiones")
public class ProductVersionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID idVersion;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "producto_id", nullable = false)
  private ProductEntity producto;

  @Column(nullable = false)
  private String versionNumber;

  private BigDecimal precioBase;
  private LocalDateTime fechaVersion;

  @Column(columnDefinition = "TEXT")
  private String cambios;
}
