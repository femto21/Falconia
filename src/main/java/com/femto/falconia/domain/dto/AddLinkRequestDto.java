package com.femto.falconia.domain.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddLinkRequestDto(

        @NotNull
        String url,
        @NotNull
        String linkName
) {
}
