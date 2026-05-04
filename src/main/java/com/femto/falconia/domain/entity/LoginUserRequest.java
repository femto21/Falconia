package com.femto.falconia.domain.entity;

public record LoginUserRequest(
        String email,
        String password
) {
}
