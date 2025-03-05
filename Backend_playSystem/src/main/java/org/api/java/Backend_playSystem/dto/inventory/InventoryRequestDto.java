package org.api.java.Backend_playSystem.dto.inventory;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public record InventoryRequestDto(
    @NotNull String productoVersionId,
    @Positive Integer cantidad,
    @Positive Integer stockMinimo,
    String ubicacion) {
}
