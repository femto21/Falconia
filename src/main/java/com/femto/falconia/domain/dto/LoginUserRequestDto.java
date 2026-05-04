package com.femto.falconia.domain.dto;

import jakarta.validation.constraints.NotNull;

public record LoginUserRequestDto (

    @NotNull(message = ERROR_MESSAGE_EMAIL_NULL)
    String email,
    @NotNull(message = ERROR_MESSAGE_PASSWORD_NULL)
    String password
) {
        private static final String ERROR_MESSAGE_EMAIL_NULL = "email is required";

        private static final String ERROR_MESSAGE_PASSWORD_NULL = "password is required";

    }
