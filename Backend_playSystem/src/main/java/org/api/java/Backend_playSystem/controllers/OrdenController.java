package org.api.java.Backend_playSystem.controllers;

import org.api.java.Backend_playSystem.dto.order.OrdenRequestDto;
import org.api.java.Backend_playSystem.entities.OrderWorkEntity;
import org.api.java.Backend_playSystem.services.OrdenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ordenes")
@RequiredArgsConstructor
public class OrdenController {

  private final OrdenService ordenService;

  @PostMapping("/proyecto/{proyectoId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<OrderWorkEntity> crearOrden(
      @PathVariable String proyectoId,
      @RequestBody OrdenRequestDto dto) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ordenService.crearOrden(proyectoId, dto));
  }
}
