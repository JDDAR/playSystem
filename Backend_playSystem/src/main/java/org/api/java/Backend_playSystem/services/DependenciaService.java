package org.api.java.Backend_playSystem.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaResponseDto;
import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaUpdateDto;
import org.api.java.Backend_playSystem.entities.ClientEntity;
import org.api.java.Backend_playSystem.entities.DependenciaEntity;
import org.api.java.Backend_playSystem.repositories.ClientRepository;
import org.api.java.Backend_playSystem.repositories.DependenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class DependenciaService {

  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private DependenciaRepository dependenciaRepository;

  @Transactional
  public DependenciaEntity agregarDependencia(String clienteId, DependenciaRequestDto dto) {
    ClientEntity cliente = clientRepository.findById(clienteId)
        .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

    DependenciaEntity nuevaDependencia = new DependenciaEntity();
    nuevaDependencia.setCliente(cliente);
    nuevaDependencia.setNumLocal(dto.getNumLocal());
    nuevaDependencia.setPuntoVenta(dto.getPuntoVenta());
    nuevaDependencia.setDireccion(dto.getDireccion());
    nuevaDependencia.setTels(dto.getTels());
    nuevaDependencia.setInstalador(dto.getInstalador());
    nuevaDependencia.setEnt(dto.getEnt());
    nuevaDependencia.setParqueadero(dto.getParqueadero());
    nuevaDependencia.setCenefa(dto.getCenefa());
    nuevaDependencia.setBanderinesExternos(dto.getBanderinesExternos());
    nuevaDependencia.setVinilosVidrios(dto.getVinilosVidrios());
    nuevaDependencia.setPendones(dto.getPendones());
    nuevaDependencia.setAntenas(dto.getAntenas());
    nuevaDependencia.setCabezotes(dto.getCabezotes());
    nuevaDependencia.setArea(dto.getArea());
    nuevaDependencia.setHorario(dto.getHorario());
    nuevaDependencia.setCiudad(dto.getCiudad());
    nuevaDependencia.setRegion(dto.getRegion());
    nuevaDependencia.setPrioridad(dto.getPrioridad());
    nuevaDependencia.setEnvio(dto.getEnvio());
    nuevaDependencia.setTamanoTienda(dto.getTamanoTienda());
    nuevaDependencia.setTipoEstructura(dto.getTipoEstructura());
    nuevaDependencia.setFechaCreacion(LocalDateTime.now());

    return dependenciaRepository.save(nuevaDependencia);
  }

  public List<DependenciaRequestDto> getDependenciaByClientId(String clienteId) {
    List<DependenciaEntity> dependencias = dependenciaRepository.findByClienteId(clienteId);
    return dependencias.stream()
        .map(dependencia -> new DependenciaRequestDto(
            dependencia.getIdDependencia(),
            dependencia.getNumLocal(),
            dependencia.getPuntoVenta(),
            dependencia.getDireccion(),
            dependencia.getCliente().getId(),
            dependencia.getTels(),
            dependencia.getInstalador(),
            dependencia.getEnt(),
            dependencia.getParqueadero(),
            dependencia.getCenefa(),
            dependencia.getBanderinesExternos(),
            dependencia.getVinilosVidrios(),
            dependencia.getPendones(),
            dependencia.getAntenas(),
            dependencia.getCabezotes(),
            dependencia.getArea(),
            dependencia.getHorario(),
            dependencia.getCiudad(),
            dependencia.getRegion(),
            dependencia.getPrioridad(),
            dependencia.getEnvio(),
            dependencia.getTamanoTienda(),
            dependencia.getTipoEstructura(),
            dependencia.getFechaCreacion()))
        .collect(Collectors.toList());
  }

  @Transactional
  public DependenciaEntity actualizarDependencia(String dependenciaId, DependenciaUpdateDto dto) {
    DependenciaEntity dependencia = dependenciaRepository.findById(dependenciaId)
        .orElseThrow(() -> new RuntimeException("Dependencia no encontrada"));

    // No cambiamos el cliente ni la fecha de creación
    dependencia.setNumLocal(dto.getNumLocal());
    dependencia.setPuntoVenta(dto.getPuntoVenta());
    dependencia.setDireccion(dto.getDireccion());
    dependencia.setTels(dto.getTels());
    dependencia.setInstalador(dto.getInstalador());
    dependencia.setEnt(dto.getEnt());
    dependencia.setParqueadero(dto.getParqueadero());
    dependencia.setCenefa(dto.getCenefa());
    dependencia.setBanderinesExternos(dto.getBanderinesExternos());
    dependencia.setVinilosVidrios(dto.getVinilosVidrios());
    dependencia.setPendones(dto.getPendones());
    dependencia.setAntenas(dto.getAntenas());
    dependencia.setCabezotes(dto.getCabezotes());
    dependencia.setArea(dto.getArea());
    dependencia.setHorario(dto.getHorario());
    dependencia.setCiudad(dto.getCiudad());
    dependencia.setRegion(dto.getRegion());
    dependencia.setPrioridad(dto.getPrioridad());
    dependencia.setEnvio(dto.getEnvio());
    dependencia.setTamanoTienda(dto.getTamanoTienda());
    dependencia.setTipoEstructura(dto.getTipoEstructura());

    return dependenciaRepository.save(dependencia);
  }

  @Transactional
  public void eliminarDependencia(String dependenciaId) {
    DependenciaEntity dependencia = dependenciaRepository.findById(dependenciaId)
        .orElseThrow(() -> new RuntimeException("Dependencia no encontrada"));
    dependenciaRepository.delete(dependencia);
  }

  public List<DependenciaResponseDto> getDependenciesByClientId(String clientId) {
    List<DependenciaEntity> dependencies = dependenciaRepository.findByClienteId(clientId);
    return dependencies.stream()
        .map(DependenciaResponseDto::new) // Usamos el constructor que mapea la entidad
        .collect(Collectors.toList());
  }
}