package com.femto.falconia.domain.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record RegisterUserRequestDto(
        @NotBlank(message = ERROR_MESSAGE_TITLE_LENGTH)
        @Length(max = 255, message = ERROR_MESSAGE_TITLE_LENGTH)
        String username,
        @Nullable
        String firstName,
        @Nullable
        String lastName,
        String email,
        @NotNull(message = ERROR_MESSAGE_PASSWORD_LENGTH)
        @Length(min = 6, message = ERROR_MESSAGE_PASSWORD_LENGTH)
        String password
) {
        private static final String ERROR_MESSAGE_TITLE_LENGTH = "username must be between 1 and 255 characters";

        private static final String ERROR_MESSAGE_PASSWORD_LENGTH = "password must be at least 6 characters";
}
