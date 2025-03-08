package org.api.java.Backend_playSystem.services;

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
public class ClientUpdateDto {
	private String nombreEmpresa;
	private String nit;
	private String telefonoContacto;
	private String emailContacto;
	private String direccionPrincipal;
	private String observaciones;
	private String descripcion;
}