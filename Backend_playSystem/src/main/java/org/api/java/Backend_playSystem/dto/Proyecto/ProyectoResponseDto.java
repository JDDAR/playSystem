package org.api.java.Backend_playSystem.dto.Proyecto;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import java.time.LocalDateTime;
import java.util.List;

import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;

public record ProyectoResponseDto(
    String idProject,
    String numeroProyecto,
    String clienteNombre,
    LocalDateTime fechaCreacion,
    EstadoProjectEnum estadoProyecto,
    List<DependenciaResponseDto> dependencias) {
}
