package org.api.java.Backend_playSystem.services;

import java.util.List;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoRequestDto;
import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoResponseDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.entities.DependencyProjectEntity;
import org.api.java.Backend_playSystem.entities.ProyectoEntity;
import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;
import org.api.java.Backend_playSystem.repositories.ClientRepository;
import org.api.java.Backend_playSystem.repositories.DependenciaRepository;
import org.api.java.Backend_playSystem.repositories.ProyectoRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProyectoService {

  private final ProyectoRepository proyectoRepository;
  private final ClientRepository clientRepository;
  private final DependenciaRepository dependenciaRepository;

  public ProyectoService(ProyectoRepository proyectoRepository,
      ClientRepository clientRepository,
      DependenciaRepository dependenciaRepository) {
    this.proyectoRepository = proyectoRepository;
    this.clientRepository = clientRepository;
    this.dependenciaRepository = dependenciaRepository;
  }

  public ProyectoResponseDto crearProyecto(ProyectoRequestDto proyectoDto) {
    ClientEntity cliente = clientRepository.findById(proyectoDto.clienteId())
        .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));

    List<DependenciaEntity> dependencias = dependenciaRepository.findAllById(proyectoDto.dependenciasIds());

    if (dependencias.isEmpty()) {
      throw new IllegalArgumentException("Debe seleccionar al menos una dependencia");
    }

    ProyectoEntity proyecto = new ProyectoEntity();
    proyecto.setNumeroProyecto(proyectoDto.numeroProyecto());
    proyecto.setCliente(cliente);
    proyecto.setEstadoProjecto(
        proyectoDto.estadoProyecto() != null ? proyectoDto.estadoProyecto() : EstadoProjectEnum.COTIZACION);

    // Crear relaciones con dependencias
    List<DependencyProjectEntity> dependenciasProyecto = dependencias.stream()
        .map(dep -> {
          DependencyProjectEntity dp = new DependencyProjectEntity();
          dp.setProyecto(proyecto);
          dp.setDependencia(dep);
          return dp;
        }).toList();

    proyecto.setDependenciasAsociadas(dependenciasProyecto);

    ProyectoEntity saved = proyectoRepository.save(proyecto);
    return mapToProyectoResponseDto(saved);
  }

  private ProyectoResponseDto mapToProyectoResponseDto(ProyectoEntity proyecto) {
    return new ProyectoResponseDto(
        proyecto.getIdProject(),
        proyecto.getNumeroProyecto(),
        proyecto.getCliente().getNombreEmpresa(),
        proyecto.getFechaCreacion(),
        proyecto.getEstadoProjecto(),
        proyecto.getDependenciasAsociadas().stream()
            .map(dp -> new DependenciaResponseDto(dp.getDependencia()))
            .toList());
  }
}
