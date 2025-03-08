package org.api.java.Backend_playSystem.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.api.java.Backend_playSystem.entities.User;
import org.api.java.Backend_playSystem.entities.Role;
import org.api.java.Backend_playSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService implements UserDetailsService {

  private static final Logger log = LoggerFactory.getLogger(UserService.class);

  @Autowired
  private UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Optional<User> findByUserName(String userName) {
    return userRepository.findByUserName(userName);
  }

  @Override
  public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
    User user = userRepository.findByUserName(userName)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado..."));
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().getName().toString());

    return new org.springframework.security.core.userdetails.User(
        user.getUserName(),
        user.getPassword(),
        Collections.singleton(authority));
  }

  public boolean existsByUserName(String username) {
    return userRepository.existsByUserName(username);
  }

  public void save(User user) {
    userRepository.save(user);
  }

  public List<User> userList() {
    return userRepository.findAll();
  }

  public Optional<User> findById(String id) {
    return userRepository.findById(id);
  }

  public User update(String id, User updateUser) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con id: " + id));
    user.setUserName(updateUser.getUserName());
    user.setLastName(updateUser.getLastName());
    user.setEmail(updateUser.getEmail());
    user.setPhone(updateUser.getPhone());
    user.setAddress(updateUser.getAddress());
    user.setIdentificationNumber(updateUser.getIdentificationNumber());
    user.setDocumentType(updateUser.getDocumentType());
    if (updateUser.getPassword() != null && !updateUser.getPassword().isEmpty()) {
      user.setPassword(updateUser.getPassword()); // Solo actualizar contraseña si se envía
    }
    user.setRole(updateUser.getRole());
    return userRepository.save(user);
  }

  public void delete(String id) { // Añadir método delete
    userRepository.deleteById(id);
  }

  public boolean isUserClient(String userId) {
    try {
      log.info("Verificando rol CLIENT para usuario ID: {}", userId);
      User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
      if (user == null) {
        log.error("Usuario no encontrado con ID: {}", userId);
        return false;
      }
      Role role = user.getRole();
      log.info("Rol del usuario {}: {} (ID: {})", userId, role.getName(), role.getId());
      boolean isClient = role.getId() == 7;
      log.info("¿Es CLIENT? {}", isClient);
      return isClient;
    } catch (Exception e) {
      log.error("Error en isUserClient: ", e);
      return false;
    }
  }
}