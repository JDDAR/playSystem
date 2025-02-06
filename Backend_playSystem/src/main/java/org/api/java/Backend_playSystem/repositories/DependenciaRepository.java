package org.api.java.Backend_playSystem.repositories;

import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DependenciaRepository extends JpaRepository<DependenciaEntity, String> {
}
