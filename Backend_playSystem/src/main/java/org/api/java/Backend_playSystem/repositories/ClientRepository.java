package org.api.java.Backend_playSystem.repositories;

import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, String> {
  List<ClientEntity> findByNombreEmpresaContainingIgnoreCase(String name);
}
