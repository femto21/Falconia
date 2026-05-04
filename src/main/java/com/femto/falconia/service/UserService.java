package com.femto.falconia.service;

import com.femto.falconia.domain.entity.LoginUserRequest;
import com.femto.falconia.domain.entity.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;

public interface UserService {

    User createUser(RegisterUserRequest request);

    String loginUser(LoginUserRequest request);
}
