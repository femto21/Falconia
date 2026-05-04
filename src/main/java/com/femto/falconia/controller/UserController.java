package com.femto.falconia.controller;

import com.femto.falconia.domain.dto.LoggedInUserDto;
import com.femto.falconia.domain.dto.LoginUserRequestDto;
import com.femto.falconia.domain.dto.RegisterUserRequestDto;
import com.femto.falconia.domain.dto.UserDto;
import com.femto.falconia.domain.entity.LoginUserRequest;
import com.femto.falconia.domain.entity.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;
import com.femto.falconia.mapper.UserMapper;
import com.femto.falconia.service.JwtService;
import com.femto.falconia.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public UserController(UserService userService, UserMapper userMapper, JwtService jwtService) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<UserDto> RegisterUser(
      @Valid @RequestBody RegisterUserRequestDto registerUserRequestDto
    ) {
        RegisterUserRequest registerUserRequest = userMapper.fromRegisterDto(registerUserRequestDto);
        User user = userService.createUser(registerUserRequest);
        UserDto createdUserDto = userMapper.toRegisterDto(user);
        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);

    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> LoginUser(
            @Valid @RequestBody LoginUserRequestDto loginUserRequestDto){
        LoginUserRequest loginUserRequest = userMapper.fromLoginDto(loginUserRequestDto);
        String userLogin = userService.loginUser(loginUserRequest);
        return ResponseEntity.ok(userLogin);
    }

    @GetMapping(path = "/me")
    public ResponseEntity<LoggedInUserDto> getUserDetails(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        LoggedInUserDto loggedInUser = userMapper.toLoggedInUserDto(user);
        return ResponseEntity.ok(loggedInUser);
    }

}
