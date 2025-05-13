package org.api.java.Backend_playSystem.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "clientes")
public class ClientEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String nombreEmpresa;

  @Column(nullable = false)
  private String nit;

  @Column(name = "fechaCreacion", updatable = false)
  private LocalDateTime fechaCreacion;

  private String telefonoContacto;
  private String emailContacto;
  private String direccionPrincipal;
  private String observaciones;
  private String descripcion;

  @OneToOne
  @JoinColumn(name = "id_user")
  private User user;

  @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<DependenciaEntity> dependencias;

  // Getters y setters manuales
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getNombreEmpresa() {
    return nombreEmpresa;
  }

  public void setNombreEmpresa(String nombreEmpresa) {
    this.nombreEmpresa = nombreEmpresa;
  }

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public LocalDateTime getFechaCreacion() {
    return fechaCreacion;
  }

  public void setFechaCreacion(LocalDateTime fechaCreacion) {
    this.fechaCreacion = fechaCreacion;
  }

  public String getTelefonoContacto() {
    return telefonoContacto;
  }

  public void setTelefonoContacto(String telefonoContacto) {
    this.telefonoContacto = telefonoContacto;
  }

  public String getEmailContacto() {
    return emailContacto;
  }

  public void setEmailContacto(String emailContacto) {
    this.emailContacto = emailContacto;
  }

  public String getDireccionPrincipal() {
    return direccionPrincipal;
  }

  public void setDireccionPrincipal(String direccionPrincipal) {
    this.direccionPrincipal = direccionPrincipal;
  }

  public String getObservaciones() {
    return observaciones;
  }

  public void setObservaciones(String observaciones) {
    this.observaciones = observaciones;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<DependenciaEntity> getDependencias() {
    return dependencias;
  }

  public void setDependencias(List<DependenciaEntity> dependencias) {
    this.dependencias = dependencias;
  }
}
