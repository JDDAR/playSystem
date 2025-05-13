package org.api.java.Backend_playSystem.dto.order;

import java.math.BigDecimal;

import org.api.java.Backend_playSystem.enums.EstadoOrderEnum;

public record OrdenRequestDto(
    String productoId,
    String nombreProducto,
    String caracteristicasProducto,
    Integer cantidad,
    BigDecimal precioUnitario,
    EstadoOrderEnum estadoOrden) {
}
