package org.api.java.Backend_playSystem.dto.Proyecto;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProyectoResponseDto {
    private String idProject;
    private String numeroProyecto;
    private String clienteNombre;
    private LocalDateTime fechaCreacion;
    private EstadoProjectEnum estadoProyecto;
    private List<DependenciaResponseDto> dependencias;

    // Constructor requerido por @Data (puedes omitirlo si no necesitas
    // personalización)
    public ProyectoResponseDto(String idProject, String numeroProyecto, String clienteNombre,
            LocalDateTime fechaCreacion, EstadoProjectEnum estadoProyecto,
            List<DependenciaResponseDto> dependencias) {
        this.idProject = idProject;
        this.numeroProyecto = numeroProyecto;
        this.clienteNombre = clienteNombre;
        this.fechaCreacion = fechaCreacion;
        this.estadoProyecto = estadoProyecto;
        this.dependencias = dependencias;
    }
}