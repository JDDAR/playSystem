package org.api.java.Backend_playSystem.dto.Proyecto;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;

public record ProyectoRequestDto(
    @NotNull String clienteId,
    @NotEmpty List<String> dependenciasIds,
    String numeroProyecto,
    EstadoProjectEnum estadoProyecto) {
}
