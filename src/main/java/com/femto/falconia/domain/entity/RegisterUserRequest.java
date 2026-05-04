package com.femto.falconia.domain.entity;

public record RegisterUserRequest(
        String username,
        String firstName,
        String lastName,
        String email,
        String password) {

}
