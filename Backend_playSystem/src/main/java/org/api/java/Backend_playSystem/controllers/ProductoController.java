package org.api.java.Backend_playSystem.controllers;

import java.util.List;

import org.api.java.Backend_playSystem.entities.ProductEntity;
import org.api.java.Backend_playSystem.repositories.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

  private final ProductoRepository productoRepository;

  public ProductoController(ProductoRepository productoRepository) {
    this.productoRepository = productoRepository;
  }

  @GetMapping
  public ResponseEntity<List<ProductEntity>> getAllProductos() {
    return ResponseEntity.ok(productoRepository.findAll());
  }
}
