package com.femto.falconia.mapper.impl;

import com.femto.falconia.domain.dto.LoggedInUserDto;
import com.femto.falconia.domain.dto.LoginUserRequestDto;
import com.femto.falconia.domain.dto.RegisterUserRequestDto;
import com.femto.falconia.domain.dto.UserDto;
import com.femto.falconia.domain.entity.LoginUserRequest;
import com.femto.falconia.domain.entity.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;
import com.femto.falconia.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public RegisterUserRequest fromRegisterDto(RegisterUserRequestDto dto) {
        return new RegisterUserRequest(
                dto.username(),
                dto.firstName(),
                dto.lastName(),
                dto.email(),
                dto.password()
        );
    }

    @Override
    public UserDto toRegisterDto(User user) {
        return new UserDto(
                user.getId(),
                user.getDisplayUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword()
        );
    }

    @Override
    public LoginUserRequest fromLoginDto(LoginUserRequestDto dto) {
        return new LoginUserRequest(
                dto.email(),
                dto.password()
        );
    }

    @Override
    public LoggedInUserDto toLoggedInUserDto(User user) {
        return new LoggedInUserDto(
                user.getId(),
                user.getDisplayUsername(),
                user.getFirstName(),
                user.getLastName()
        );
    }


}
