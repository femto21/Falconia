package com.femto.falconia.domain.dto;

import java.util.UUID;

public record LoggedInUserDto(
        UUID id,
        String username,
        String firstName,
        String lastName
) {
}
