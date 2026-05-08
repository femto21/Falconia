package com.femto.falconia.domain.dto;

import java.util.UUID;

public record LinkDto(
        UUID id,
        String linkName,
        String url
) {
}
