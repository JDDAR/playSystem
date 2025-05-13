package org.api.java.Backend_playSystem.controllers;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.api.java.Backend_playSystem.dto.user.NewUserDto;
import org.api.java.Backend_playSystem.dto.user.UserUpdateDto;
import org.api.java.Backend_playSystem.services.AuthService;
import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.repositories.RoleRepository;
import org.api.java.Backend_playSystem.entities.Role;
import org.api.java.Backend_playSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;
  private final AuthService authService;
  private final RoleRepository roleRepository;

  @Autowired
  public UserController(UserService userService, AuthService authService, RoleRepository roleRepository) {
    this.userService = userService;
    this.authService = authService;
    this.roleRepository = roleRepository;
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @GetMapping("/userList")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.userList();
    return ResponseEntity.ok(users);
  }

  @PostMapping("/register")
  @PreAuthorize("hasRole('ADMINISTRATOR')")
  public ResponseEntity<String> register(@Valid @RequestBody NewUserDto newUserDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest().body("Revise los campos: " + bindingResult.getFieldErrors());
    }
    try {
      String response = authService.registerUser(newUserDto);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<User>> getUserById(@PathVariable String id) {
    Optional<User> user = userService.findById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(user);
    }
    return ResponseEntity.notFound().build();
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @PutMapping("/{id}")
  public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody UserUpdateDto userDto) {
    try {
      Optional<User> existingUser = userService.findById(id);
      if (!existingUser.isPresent()) {
        return ResponseEntity.notFound().build();
      }
      User updatedUser = existingUser.get();
      if (userDto.getUserName() != null)
        updatedUser.setUserName(userDto.getUserName());
      if (userDto.getLastName() != null)
        updatedUser.setLastName(userDto.getLastName());
      if (userDto.getEmail() != null)
        updatedUser.setEmail(userDto.getEmail());
      if (userDto.getPhone() != null)
        updatedUser.setPhone(userDto.getPhone());
      if (userDto.getAddress() != null)
        updatedUser.setAddress(userDto.getAddress());
      if (userDto.getIdentificationNumber() != null)
        updatedUser.setIdentificationNumber(userDto.getIdentificationNumber());
      if (userDto.getDocumentType() != null)
        updatedUser.setDocumentType(userDto.getDocumentType());
      if (userDto.getIdRol() != null) {
        Role role = roleRepository.findById(userDto.getIdRol())
            .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado con ID: " + userDto.getIdRol()));
        updatedUser.setRole(role);
      }
      userService.save(updatedUser);
      return ResponseEntity.ok("Usuario actualizado con éxito");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error al actualizar usuario: " + e.getMessage());
    }
  }

  @PreAuthorize("hasRole('ADMINISTRATOR')")
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable String id) {
    try {
      Optional<User> user = userService.findById(id);
      if (!user.isPresent()) {
        return ResponseEntity.notFound().build();
      }
      userService.delete(id);
      return ResponseEntity.ok("Usuario eliminado con éxito");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error al eliminar usuario: " + e.getMessage());
    }
  }
}