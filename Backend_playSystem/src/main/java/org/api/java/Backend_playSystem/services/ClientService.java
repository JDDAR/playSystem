package org.api.java.Backend_playSystem.services;

import org.api.java.Backend_playSystem.dto.cliente.ClientRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientResponseDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientUpdateDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.repositories.ClientRepository;
import org.api.java.Backend_playSystem.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

  private static final Logger log = LoggerFactory.getLogger(ClientService.class);

  private final ClientRepository clientRepository;
  private final UserRepository userRepository;

  @Autowired
  public ClientService(ClientRepository clientRepository, UserRepository userRepository) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
  }

  public List<ClientEntity> listClient() {
    return clientRepository.findAll();
  }

  @Transactional
  public ClientEntity createClient(ClientRequestDto clientRequestDto) {
    User user = userRepository.findById(clientRequestDto.getUserId())
        .orElseThrow(() -> {
          log.error("Usuario no encontrado con ID: {}", clientRequestDto.getUserId());
          return new IllegalArgumentException("Usuario no encontrado con ID: " + clientRequestDto.getUserId());
        });

    ClientEntity client = new ClientEntity();
    client.setNombreEmpresa(clientRequestDto.getNombreEmpresa());
    client.setNit(clientRequestDto.getNit());
    client.setTelefonoContacto(clientRequestDto.getTelefonoContacto());
    client.setEmailContacto(clientRequestDto.getEmailContacto());
    client.setDireccionPrincipal(clientRequestDto.getDireccionPrincipal());
    client.setObservaciones(clientRequestDto.getObservaciones());
    client.setDescripcion(clientRequestDto.getDescripcion());
    client.setUser(user);
    client.setFechaCreacion(LocalDateTime.now());

    ClientEntity savedClient = clientRepository.save(client);
    log.info("Cliente creado con ID: {}", savedClient.getId());
    return savedClient;
  }

  public List<ClientResponseDto> searchClients(String query, int limit) {
    List<ClientEntity> clients = clientRepository
        .findByNombreEmpresaContainingIgnoreCaseOrNitContainingIgnoreCase(query, query);
    return clients.stream()
        .limit(limit)
        .map(client -> new ClientResponseDto(
            client.getId(),
            client.getNombreEmpresa(),
            client.getNit(),
            client.getEmailContacto(),
            client.getTelefonoContacto()))
        .collect(Collectors.toList());
  }

  public Optional<ClientEntity> findById(String id) {
    return clientRepository.findById(id);
  }

  @Transactional
  public ClientEntity updateClient(String id, ClientUpdateDto clientUpdateDto) {
    ClientEntity client = clientRepository.findById(id)
        .orElseThrow(() -> {
          log.error("Cliente no encontrado con ID: {}", id);
          return new IllegalArgumentException("Cliente no encontrado con ID: " + id);
        });

    // Actualizar solo los campos proporcionados
    updateIfPresent(clientUpdateDto.getNombreEmpresa(), client::setNombreEmpresa);
    updateIfPresent(clientUpdateDto.getNit(), client::setNit);
    updateIfPresent(clientUpdateDto.getTelefonoContacto(), client::setTelefonoContacto);
    updateIfPresent(clientUpdateDto.getEmailContacto(), client::setEmailContacto);
    updateIfPresent(clientUpdateDto.getDireccionPrincipal(), client::setDireccionPrincipal);
    updateIfPresent(clientUpdateDto.getObservaciones(), client::setObservaciones);
    updateIfPresent(clientUpdateDto.getDescripcion(), client::setDescripcion);

    ClientEntity updatedClient = clientRepository.save(client);
    log.info("Cliente actualizado con ID: {}", updatedClient.getId());
    return updatedClient;
  }

  // Método auxiliar para actualizar solo si el valor no es nulo
  private <T> void updateIfPresent(T value, java.util.function.Consumer<T> setter) {
    if (value != null) {
      setter.accept(value);
    }
  }
}