package org.api.java.Backend_playSystem.repositories;

import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<ClientEntity, String> {
  List<ClientEntity> findByNombreEmpresaContainingIgnoreCaseOrNitContainingIgnoreCase(String nombre, String nit);
}