package org.api.java.Backend_playSystem.dto.cliente;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ClientResponseDto {
  private String id;
  private String nombreEmpresa;
  private String nit;
  private String telefonoContacto;
  private String emailContacto;
}
