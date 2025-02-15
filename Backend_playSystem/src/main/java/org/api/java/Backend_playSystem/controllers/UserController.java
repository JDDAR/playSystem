package org.api.java.Backend_playSystem.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.api.java.Backend_playSystem.dto.user.NewUserDto;
import org.api.java.Backend_playSystem.services.AuthService;
import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;
  private final AuthService authService;

  @Autowired
  public UserController(UserService userService, AuthService authService) {
    this.userService = userService;
    this.authService = authService;
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
      // Si hay errores, devolvemos un mensaje claro
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

  // Actualizar Usuario
  @PutMapping("/{id}")
  public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User user) {
    try {
      userService.update(id, user);
      return ResponseEntity.ok("Usuario Actualizado con exito");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
