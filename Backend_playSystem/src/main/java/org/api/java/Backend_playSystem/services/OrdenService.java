package org.api.java.Backend_playSystem.services;

import java.math.BigDecimal;

import org.api.java.Backend_playSystem.dto.order.OrdenRequestDto;
import org.api.java.Backend_playSystem.entities.OrderWorkEntity;
import org.api.java.Backend_playSystem.entities.ProductEntity;
import org.api.java.Backend_playSystem.entities.ProyectoEntity;
import org.api.java.Backend_playSystem.enums.EstadoOrderEnum;
import org.api.java.Backend_playSystem.repositories.OrderWorkRepository;
import org.api.java.Backend_playSystem.repositories.ProductoRepository;
import org.api.java.Backend_playSystem.repositories.ProyectoRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrdenService {

  private final ProyectoRepository proyectoRepository;
  private final ProductoRepository productoRepository;
  private final OrderWorkRepository orderWorkRepository;

  public OrdenService(ProyectoRepository proyectoRepository,
      ProductoRepository productoRepository,
      OrderWorkRepository orderWorkRepository) {
    this.proyectoRepository = proyectoRepository;
    this.productoRepository = productoRepository;
    this.orderWorkRepository = orderWorkRepository;
  }

  public OrderWorkEntity crearOrden(String proyectoId, OrdenRequestDto ordenDto) {
    ProyectoEntity proyecto = proyectoRepository.findById(proyectoId)
        .orElseThrow(() -> new EntityNotFoundException("Proyecto no encontrado"));

    ProductEntity producto = null;
    if (ordenDto.productoId() != null) {
      producto = productoRepository.findById(ordenDto.productoId())
          .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
    } else if (ordenDto.nombreProducto() != null) {
      producto = crearOActualizarProducto(ordenDto);
    }

    OrderWorkEntity orden = new OrderWorkEntity();
    orden.setProyecto(proyecto);
    orden.setProducto(producto);
    orden.setNombreProductoPersonalizado(ordenDto.nombreProducto());
    orden.setCaracteristicasProductoPersonalizado(ordenDto.caracteristicasProducto());
    orden.setCantidad(ordenDto.cantidad());
    orden.setEstadoOrden(ordenDto.estadoOrden() != null ? ordenDto.estadoOrden() : EstadoOrderEnum.PENDIENTE);
    orden.setPrecioUnitario(ordenDto.precioUnitario());
    orden.setPrecioTotal(ordenDto.precioUnitario().multiply(BigDecimal.valueOf(ordenDto.cantidad())));

    return orderWorkRepository.save(orden);
  }

  private ProductEntity crearOActualizarProducto(OrdenRequestDto ordenDto) {
    ProductEntity producto = productoRepository.findByNombre(ordenDto.nombreProducto())
        .orElseGet(() -> new ProductEntity());

    producto.setNombre(ordenDto.nombreProducto());
    producto.setCaracteristicas(ordenDto.caracteristicasProducto());
    return productoRepository.save(producto);
  }
}
