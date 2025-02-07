package org.api.java.Backend_playSystem.entities;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import org.api.java.Backend_playSystem.enums.DocumentType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @NotBlank
  @Column(nullable = false)
  private String userName;

  @NotBlank
  @Column(nullable = false)
  private String lastName;

  @NotBlank
  @Column(unique = true, nullable = false)
  private String email;

  @Column()
  private String phone;

  @Column
  private String address;

  @Column(name = "fechaCreacion", updatable = false)
  private LocalDateTime fechaCreacion;

  @NotBlank
  @Column(unique = false)
  private String password;

  @Column(nullable = false, unique = true)
  private String identificationNumber;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DocumentType documentType;

  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "roleId", nullable = false)
  private Role role;

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonBackReference
  private ClientEntity client;

  public User(String userName, String lastName, String email, String phone, String address, String password,
      String identificationNumber, DocumentType documentType, Role role) {
    this.userName = userName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.password = password;
    this.identificationNumber = identificationNumber;
    this.documentType = documentType;
    this.role = role;
    this.fechaCreacion = LocalDateTime.now(); // Fecha de creación por defecto
  }

}
