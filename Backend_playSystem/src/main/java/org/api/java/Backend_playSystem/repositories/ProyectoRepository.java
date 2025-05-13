package org.api.java.Backend_playSystem.repositories;

import java.util.Optional;

import org.api.java.Backend_playSystem.entities.ProyectoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProyectoRepository extends JpaRepository<ProyectoEntity, String> {
  Optional<ProyectoEntity> findByNumeroProyecto(String numeroProyecto);
}
