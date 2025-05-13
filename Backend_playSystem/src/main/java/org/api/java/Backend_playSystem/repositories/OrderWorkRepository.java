package org.api.java.Backend_playSystem.repositories;

import org.api.java.Backend_playSystem.entities.OrderWorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderWorkRepository extends JpaRepository<OrderWorkEntity, String> {
}
