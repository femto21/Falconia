package com.femto.falconia.domain.model;

public record RegisterUserRequest(
        String username,
        String firstName,
        String lastName,
        String email,
        String password) {

}
