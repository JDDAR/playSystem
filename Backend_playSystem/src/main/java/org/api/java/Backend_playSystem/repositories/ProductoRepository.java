package org.api.java.Backend_playSystem.repositories;

import java.util.Optional;

import org.api.java.Backend_playSystem.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<ProductEntity, String> {
  boolean existsByNombre(String nombre);

  Optional<ProductEntity> findByNombre(String nombre);
}
