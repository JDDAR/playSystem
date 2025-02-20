package org.api.java.Backend_playSystem.controllers;

import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoRequestDto;
import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoResponseDto;
import org.api.java.Backend_playSystem.services.ProyectoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
public class ProyectoController {

  private final ProyectoService proyectoService;

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ProyectoResponseDto> crearProyecto(@RequestBody ProyectoRequestDto dto) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(proyectoService.crearProyecto(dto));
  }
}
