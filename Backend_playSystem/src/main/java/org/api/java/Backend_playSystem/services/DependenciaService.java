package org.api.java.Backend_playSystem.services;

import java.time.LocalDateTime;

import org.api.java.Backend_playSystem.dto.Dependencias.DependenciaRequestDto;
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
}
