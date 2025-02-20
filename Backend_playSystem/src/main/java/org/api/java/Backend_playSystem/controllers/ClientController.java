package org.api.java.Backend_playSystem.controllers;

import java.util.List;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientRequestDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.services.ClientService;
import org.api.java.Backend_playSystem.services.DependenciaService;
import org.api.java.Backend_playSystem.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

  private static final Logger log = LoggerFactory.getLogger(UserService.class);

  private final ClientService clientService;
  private final DependenciaService dependenciaService;

  public ClientController(ClientService clientService, DependenciaService dependenciaService) {
    this.clientService = clientService;
    this.dependenciaService = dependenciaService;
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @GetMapping("/listaClientes")
  public List<ClientEntity> listClient() {
    return clientService.listClient();
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @PostMapping("/crearCliente")
  public ResponseEntity<?> createClient(@RequestBody ClientRequestDto clientRequestDto) {
    try {
      log.info("Intentando crear cliente para usuario ID: {}", clientRequestDto.getUserId());

      ClientEntity newClient = clientService.createClient(clientRequestDto);

      log.info("Cliente creado exitosamente: {}", newClient.getId());
      return ResponseEntity.ok(newClient);
    } catch (IllegalArgumentException e) {
      log.warn("Validación fallida: {}", e.getMessage());
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      log.error("Error inesperado: ", e);
      return ResponseEntity.internalServerError().body("Error interno");
    }
  }

  @GetMapping("/{id}/dependencias")
  public ResponseEntity<List<DependenciaRequestDto>> getDependenciasByCliente(@PathVariable String id) {
    return ResponseEntity.ok(dependenciaService.getDependenciaByClientId(id));
  }
}
