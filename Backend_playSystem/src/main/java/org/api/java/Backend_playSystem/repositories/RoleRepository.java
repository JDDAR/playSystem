package org.api.java.Backend_playSystem.repositories;

import java.util.Optional;

import org.api.java.Backend_playSystem.entities.Role;
import org.api.java.Backend_playSystem.enums.RoleList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(RoleList name);
}
