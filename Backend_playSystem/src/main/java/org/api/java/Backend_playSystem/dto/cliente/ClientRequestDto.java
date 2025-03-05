package org.api.java.Backend_playSystem.dto.cliente;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientRequestDto {

  @NotNull(message = "El nombre de la empresa es obligatorio")
  private String nombreEmpresa;

  @NotNull(message = "El NIT es obligatorio")
  private String nit;

  @NotNull(message = "El teléfono de contacto es obligatorio")
  private String telefonoContacto;

  @NotNull(message = "El email de contacto es obligatorio")
  private String emailContacto;

  @NotNull(message = "La dirección principal es obligatoria")
  private String direccionPrincipal;

  private String observaciones;
  private String descripcion;

  @NotNull(message = "El userId es obligatorio")
  private String userId;
}
