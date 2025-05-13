package org.api.java.Backend_playSystem.controllers;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.api.java.Backend_playSystem.enums.CiudadEnum;
import org.api.java.Backend_playSystem.enums.DocumentType;
import org.api.java.Backend_playSystem.enums.EnvioEnum;
import org.api.java.Backend_playSystem.enums.HorarioEnum;
import org.api.java.Backend_playSystem.enums.PrioridadEnum;
import org.api.java.Backend_playSystem.enums.RegionEnum;
import org.api.java.Backend_playSystem.enums.RoleList;
import org.api.java.Backend_playSystem.enums.TamanoTiendaEnum;
import org.api.java.Backend_playSystem.enums.TipoEstructuraEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("/{enumName}")
  public ResponseEntity<List<String>> getEnumValues(@PathVariable String enumName) {
    try {
      switch (enumName.toLowerCase()) {
        case "ciudad":
          return ResponseEntity.ok(Arrays.stream(CiudadEnum.values())
              .map(Enum::name)
              .collect(Collectors.toList()));
        case "region":
          return ResponseEntity.ok(Arrays.stream(RegionEnum.values())
              .map(Enum::name)
              .collect(Collectors.toList()));
        case "prioridad":
          return ResponseEntity.ok(Arrays.stream(PrioridadEnum.values())
              .map(Enum::name)
              .collect(Collectors.toList()));
        case "envio":
          return ResponseEntity.ok(Arrays.stream(EnvioEnum.values())
              .map(Enum::name)
              .collect(Collectors.toList()));
        default:
          return ResponseEntity.badRequest().body(Collections.emptyList());
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Collections.emptyList());
    }
  }
}
