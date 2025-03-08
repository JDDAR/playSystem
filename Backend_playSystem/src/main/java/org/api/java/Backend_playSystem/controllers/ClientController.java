package org.api.java.Backend_playSystem.controllers;

import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientRequestDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientResponseDto;
import org.api.java.Backend_playSystem.dto.cliente.ClientUpdateDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.services.ClientService;
import org.api.java.Backend_playSystem.services.DependenciaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

  private static final Logger log = LoggerFactory.getLogger(ClientController.class);

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
  public ResponseEntity<?> createClient(@Valid @RequestBody ClientRequestDto clientRequestDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      log.warn("Errores de validación: {}", bindingResult.getFieldErrors());
      return ResponseEntity.badRequest().body("Revise los campos: " + bindingResult.getFieldErrors());
    }
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

  @PreAuthorize("hasRole('ADMINISTRATOR')") // Mantengo el rol, ajustable según necesidad
  @GetMapping("/search")
  public ResponseEntity<List<ClientResponseDto>> searchClients(
      @RequestParam String query,
      @RequestParam(defaultValue = "10") int limit) {
    try {
      log.info("Buscando clientes con query: '{}', límite: {}", query, limit);
      List<ClientResponseDto> clients = clientService.searchClients(query, limit);
      if (clients.isEmpty()) {
        log.info("No se encontraron clientes para el query: '{}'", query);
      }
      return ResponseEntity.ok(clients); // Siempre devuelve una lista, vacía si no hay resultados
    } catch (Exception e) {
      log.error("Error al buscar clientes para el query: '{}'", query, e);
      return ResponseEntity.status(500)
          .body(Collections.emptyList()); // Lista vacía en caso de error
    }
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @PutMapping("/{id}")
  public ResponseEntity<String> updateClient(@PathVariable String id, @RequestBody ClientUpdateDto clientUpdateDto) {
    try {
      log.info("Intentando actualizar cliente ID: {}", id);
      ClientEntity updatedClient = clientService.updateClient(id, clientUpdateDto);
      log.info("Cliente actualizado exitosamente: {}", updatedClient.getId());
      return ResponseEntity.ok("Cliente actualizado con éxito");
    } catch (IllegalArgumentException e) {
      log.warn("Validación fallida: {}", e.getMessage());
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      log.error("Error al actualizar cliente: ", e);
      return ResponseEntity.internalServerError().body("Error interno al actualizar cliente");
    }
  }
}