package org.api.java.Backend_playSystem.dto.cliente;

import lombok.Data;

@Data
public class ClientResponseDto {
  private String id;
  private String nombreEmpresa;
  private String nit;
  private String telefonoContacto;
  private String emailContacto;
  private String userId;
}
