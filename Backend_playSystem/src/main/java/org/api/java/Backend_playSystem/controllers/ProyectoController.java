package org.api.java.Backend_playSystem.controllers;

import java.util.List;

import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoResponseDto;
import org.api.java.Backend_playSystem.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

	@Autowired
	private ProyectoService proyectoService;

	@PreAuthorize("hasRole('ADMINISTRATOR')")
	@PostMapping("/create")
	public ResponseEntity<ProyectoResponseDto> createProyecto(@RequestBody ProyectoRequestDto request) {
		try {
			ProyectoResponseDto proyecto = proyectoService.createProyecto(request.clientId(), request.dependencyIds());
			return ResponseEntity.ok(proyecto);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

	@PreAuthorize("hasRole('ADMINISTRATOR')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProyecto(@PathVariable String id) {
		try {
			proyectoService.deleteProyecto(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}
}

record ProyectoRequestDto(String clientId, List<String> dependencyIds) {
}