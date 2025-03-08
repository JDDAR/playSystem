package org.api.java.Backend_playSystem.controllers;

import java.util.List;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientResponseDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.services.ClientService;
import org.api.java.Backend_playSystem.services.DependenciaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

  private static final Logger log = LoggerFactory.getLogger(ClientController.class); // Looger para esta clase

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

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @GetMapping("/search")
  public ResponseEntity<List<ClientResponseDto>> searchClients(@RequestParam String name) {
    try {
      log.info("Buscando clientes con nombre: {}", name);
      List<ClientResponseDto> clients = clientService.searchClientsByName(name);
      if (clients.isEmpty()) {
        log.info("No se encontraron clientes para el nombre: {}", name);
        return ResponseEntity.noContent().build();
      }
      return ResponseEntity.ok(clients);
    } catch (Exception e) {
      log.error("Error al buscar clientes: ", e);
      return ResponseEntity.internalServerError().body(null);
    }
  }
}
