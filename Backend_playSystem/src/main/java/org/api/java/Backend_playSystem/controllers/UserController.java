package org.api.java.Backend_playSystem.controllers;

import java.util.List;
import java.util.Optional;

import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAll();
    return ResponseEntity.ok(users);
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
