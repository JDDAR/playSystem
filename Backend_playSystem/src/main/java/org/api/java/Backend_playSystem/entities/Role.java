package org.api.java.Backend_playSystem.entities;

import org.api.java.Backend_playSystem.enums.RoleList;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String descripcion;

  @Column(nullable = false, unique = true)
  @Enumerated(EnumType.STRING) // 0,1,2 ...
  private RoleList name;

}
