package com.femto.falconia.domain.model;

public record LoginUserRequest(
        String email,
        String password
) {
}
