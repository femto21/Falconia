package com.femto.falconia.service;

import com.femto.falconia.domain.model.LoginUserRequest;
import com.femto.falconia.domain.model.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;

public interface UserService {

    User createUser(RegisterUserRequest request);

    String loginUser(LoginUserRequest request);

}
