package com.femto.falconia.mapper;

import com.femto.falconia.domain.dto.LoggedInUserDto;
import com.femto.falconia.domain.dto.LoginUserRequestDto;
import com.femto.falconia.domain.dto.RegisterUserRequestDto;
import com.femto.falconia.domain.dto.UserDto;
import com.femto.falconia.domain.model.LoginUserRequest;
import com.femto.falconia.domain.model.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;

public interface UserMapper {
    RegisterUserRequest fromRegisterDto(RegisterUserRequestDto dto);

    UserDto toRegisterDto(User user);

    LoginUserRequest fromLoginDto(LoginUserRequestDto dto);

    LoggedInUserDto toLoggedInUserDto(User user);
}
