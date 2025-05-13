package org.api.java.Backend_playSystem.services;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.dto.Proyecto.ProyectoResponseDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.entities.DependencyProjectEntity;
import org.api.java.Backend_playSystem.entities.ProyectoEntity;
import org.api.java.Backend_playSystem.enums.EstadoProjectEnum;
import org.api.java.Backend_playSystem.repositories.ClientRepository;
import org.api.java.Backend_playSystem.repositories.DependenciaRepository;
import org.api.java.Backend_playSystem.repositories.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoService {

  @Autowired
  private ProyectoRepository proyectoRepository;

  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private DependenciaRepository dependenciaRepository;

  @Transactional
  public ProyectoResponseDto createProyecto(String clientId, List<String> dependencyIds) {
    ClientEntity cliente = clientRepository.findById(clientId)
        .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

    String numeroProyecto = generateNumeroProyecto();

    ProyectoEntity proyecto = new ProyectoEntity();
    proyecto.setNumeroProyecto(numeroProyecto);
    proyecto.setCliente(cliente);
    proyecto.setFechaCreacion(LocalDateTime.now());
    proyecto.setEstadoProyecto(EstadoProjectEnum.PENDIENTE);

    List<DependenciaEntity> dependencias = dependenciaRepository.findAllById(dependencyIds);
    if (dependencias.size() != dependencyIds.size()) {
      throw new RuntimeException("Algunas dependencias no fueron encontradas");
    }

    List<DependencyProjectEntity> dependenciasAsociadas = dependencias.stream()
        .map(dep -> {
          DependencyProjectEntity assoc = new DependencyProjectEntity();
          assoc.setProyecto(proyecto);
          assoc.setDependencia(dep);
          return assoc;
        })
        .collect(Collectors.toList());
    proyecto.setDependenciasAsociadas(dependenciasAsociadas);

    proyectoRepository.save(proyecto);

    List<DependenciaResponseDto> dependenciaDtos = dependencias.stream()
        .map(DependenciaResponseDto::new)
        .collect(Collectors.toList());

    return new ProyectoResponseDto(
        proyecto.getIdProject(),
        proyecto.getNumeroProyecto(),
        cliente.getNombreEmpresa(),
        proyecto.getFechaCreacion(),
        proyecto.getEstadoProyecto(),
        dependenciaDtos);
  }

  @Transactional
  public void deleteProyecto(String id) {
    ProyectoEntity proyecto = proyectoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    proyectoRepository.delete(proyecto);
  }

  private String generateNumeroProyecto() {
    Long count = proyectoRepository.count();
    return String.format("PRJ-%04d", count + 1);
  }
}