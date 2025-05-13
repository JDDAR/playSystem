package org.api.java.Backend_playSystem.controllers;

import java.util.Collections;
import java.util.List;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaUpdateDto;
import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.services.DependenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dependencias")
public class DependenciaController {

  @Autowired
  private DependenciaService dependenciaService;

  @PostMapping("/{clienteId}/agregar")
  @PreAuthorize("hasRole('ADMINISTRATOR') or hasRole('MANAGER')")
  public ResponseEntity<DependenciaEntity> agregarDependencia(
      @PathVariable String clienteId, @RequestBody DependenciaRequestDto dto) {
    DependenciaEntity nuevaDependencia = dependenciaService.agregarDependencia(clienteId, dto);
    return ResponseEntity.ok(nuevaDependencia);
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @GetMapping("/{clientId}/tiendas")
  public ResponseEntity<List<DependenciaRequestDto>> getTiendasByClientId(@PathVariable String clientId) {
    List<DependenciaRequestDto> dependencias = dependenciaService.getDependenciaByClientId(clientId);
    return ResponseEntity.ok(dependencias);
  }

  @PutMapping("/{dependenciaId}")
  @PreAuthorize("hasRole('ADMINISTRATOR')")
  public ResponseEntity<DependenciaEntity> actualizarDependencia(
      @PathVariable String dependenciaId, @RequestBody DependenciaUpdateDto dto) {
    DependenciaEntity dependenciaActualizada = dependenciaService.actualizarDependencia(dependenciaId, dto);
    return ResponseEntity.ok(dependenciaActualizada);
  }

  @DeleteMapping("/{dependenciaId}")
  @PreAuthorize("hasRole('ADMINISTRATOR')")
  public ResponseEntity<Void> eliminarDependencia(@PathVariable String dependenciaId) {
    dependenciaService.eliminarDependencia(dependenciaId);
    return ResponseEntity.noContent().build();
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @GetMapping("/cliente/{clientId}")
  public ResponseEntity<List<DependenciaResponseDto>> getDependenciesByClient(@PathVariable String clientId) {
    try {
      List<DependenciaResponseDto> dependencies = dependenciaService.getDependenciesByClientId(clientId);
      return ResponseEntity.ok(dependencies);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Collections.emptyList());
    }
  }
}