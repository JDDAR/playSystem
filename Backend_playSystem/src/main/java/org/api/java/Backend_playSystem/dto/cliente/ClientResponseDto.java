package org.api.java.Backend_playSystem.dto.cliente;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientResponseDto {
  private String id;
  private String nombreEmpresa;
  private String nit;
  private String emailContacto;
  private String telefonoContacto;
}