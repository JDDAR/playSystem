package org.api.java.Backend_playSystem.dto.auth;

import org.api.java.Backend_playSystem.dto.user.UserResponseDto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AuthResponseDto {
  private String token;
  private UserResponseDto user;

  public AuthResponseDto(String token, UserResponseDto user) {
    this.token = token;
    this.user = user;
  }
}
