package org.api.java.Backend_playSystem.controllers;

import org.api.java.Backend_playSystem.enums.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

  @GetMapping("/ciudades")
  public ResponseEntity<CiudadEnum[]> getCiudades() {
    return ResponseEntity.ok(CiudadEnum.values());
  }

  @GetMapping("/documento")
  public ResponseEntity<DocumentType[]> getDocumentos() {
    return ResponseEntity.ok(DocumentType.values());
  }

  @GetMapping("/envios")
  public ResponseEntity<EnvioEnum[]> getEnvios() {
    return ResponseEntity.ok(EnvioEnum.values());
  }

  @GetMapping("/horario")
  public ResponseEntity<HorarioEnum[]> getHorario() {
    return ResponseEntity.ok(HorarioEnum.values());
  }

  @GetMapping("/prioridad")
  public ResponseEntity<PrioridadEnum[]> getPrioridad() {
    return ResponseEntity.ok(PrioridadEnum.values());
  }

  @GetMapping("/region")
  public ResponseEntity<RegionEnum[]> getRegion() {
    return ResponseEntity.ok(RegionEnum.values());
  }

  @GetMapping("/role")
  public ResponseEntity<RoleList[]> getRole() {
    return ResponseEntity.ok(RoleList.values());
  }

  @GetMapping("/tamano")
  public ResponseEntity<TamanoTiendaEnum[]> getTamanio() {
    return ResponseEntity.ok(TamanoTiendaEnum.values());
  }

  @GetMapping("/tipo")
  public ResponseEntity<TipoEstructuraEnum[]> getTipo() {
    return ResponseEntity.ok(TipoEstructuraEnum.values());
  }
}
