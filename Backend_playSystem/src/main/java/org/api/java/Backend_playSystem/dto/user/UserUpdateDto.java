package org.api.java.Backend_playSystem.dto.user;

import lombok.Data;
import org.api.java.Backend_playSystem.enums.DocumentType;

@Data
public class UserUpdateDto {
	private String userName;
	private String lastName;
	private String email;
	private String phone;
	private String address;
	private String identificationNumber;
	private DocumentType documentType;
	private Long idRol;
}