package com.femto.falconia.service;

public interface JwtService {

    public boolean isTokenValid(String token, String email);
    public String generateToken(String email);

    public  String extractEmail(String token);
}
