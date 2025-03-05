package org.api.java.Backend_playSystem.services;

import java.util.List;
import java.util.stream.Collectors;

import org.api.java.Backend_playSystem.dto.cliente.ClientRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientResponseDto;
import org.api.java.Backend_playSystem.enums.*;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.repositories.UserRepository;
import org.api.java.Backend_playSystem.repositories.ClientRepository;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
  private final ClientRepository clientRepository;

  private final UserRepository userRepository;

  public ClientService(ClientRepository clientRepository, UserRepository userRepository) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
  }

  public List<ClientEntity> listClient() {
    return clientRepository.findAll();
  }

  public ClientEntity createClient(ClientRequestDto requestDto) {
    // Buscar usuario
    User user = userRepository.findById(requestDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

    // Validar rol CLIENT
    if (user.getRole().getName() != RoleList.CLIENT) {
      throw new IllegalArgumentException("El usuario no tiene el rol de CLIENTE");
    }

    // Crear cliente
    ClientEntity cliente = new ClientEntity();
    cliente.setNombreEmpresa(requestDto.getNombreEmpresa());
    cliente.setNit(requestDto.getNit());
    cliente.setTelefonoContacto(requestDto.getTelefonoContacto());
    cliente.setEmailContacto(requestDto.getEmailContacto());
    cliente.setDireccionPrincipal(requestDto.getDireccionPrincipal());
    cliente.setObservaciones(requestDto.getObservaciones());
    cliente.setDescripcion(requestDto.getDescripcion());
    cliente.setUser(user);

    return clientRepository.save(cliente);
  }

  public List<ClientResponseDto> searchClientsByName(String name) {
    List<ClientEntity> clients = clientRepository.findByNombreEmpresaContainingIgnoreCase(name);
    return clients.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  private ClientResponseDto convertToDto(ClientEntity client) {
    ClientResponseDto dto = new ClientResponseDto();
    dto.setId(client.getId());
    dto.setNombreEmpresa(client.getNombreEmpresa());
    dto.setNit(client.getNit());
    dto.setTelefonoContacto(client.getTelefonoContacto());
    dto.setEmailContacto(client.getEmailContacto());
    // Agrega más campos según necesites exponer al frontend
    return dto;
  }

}
