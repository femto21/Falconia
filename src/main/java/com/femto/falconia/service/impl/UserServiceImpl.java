package com.femto.falconia.service.impl;

import com.femto.falconia.domain.model.LoginUserRequest;
import com.femto.falconia.domain.model.RegisterUserRequest;
import com.femto.falconia.domain.entity.User;
import com.femto.falconia.repository.UserRepository;
import com.femto.falconia.service.JwtService;
import com.femto.falconia.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserServiceImpl(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;

    }
    @Override
    public User createUser(RegisterUserRequest request) {

        User user  = new User(
                null,
                request.username(),
                request.firstName(),
                request.lastName(),
                request.email(),
                request.password()
        );
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


    @Override
    public String loginUser(LoginUserRequest request) {

        User foundUser = userRepository
                .findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!encoder.matches(request.password(), foundUser.getPassword())) {
            throw new IllegalArgumentException("Incorrect email or password");
        }

        return jwtService.generateToken(foundUser.getEmail());
    }
}
