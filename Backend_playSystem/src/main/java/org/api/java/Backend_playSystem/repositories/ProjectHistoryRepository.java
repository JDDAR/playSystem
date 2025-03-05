package org.api.java.Backend_playSystem.repositories;

import java.util.UUID;

import org.api.java.Backend_playSystem.entities.ProjectHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectHistoryRepository extends JpaRepository<ProjectHistoryEntity, UUID> {

}
