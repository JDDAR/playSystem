package org.api.java.Backend_playSystem.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewUserDto {
  @NotBlank(message = "El nombre de usuario no puede estar vacio")
  private String userName;

  @NotBlank(message = "El apellido no puede estar vacio")
  private String lastName;

  @NotBlank(message = "El correo no puede estar vacio")
  private String email;

  @NotBlank(message = "Ingrese porfavor el numero telefonico")
  private String phone;

  @NotBlank(message = "Ingrese la direccion ")
  private String address;

  @NotBlank(message = "La contraseña no puede estar vacia")
  private String password;

  @NotNull(message = "El id del rol es obligatorio")
  private Long idRol;
}
