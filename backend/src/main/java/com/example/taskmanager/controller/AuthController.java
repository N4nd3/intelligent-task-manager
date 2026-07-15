package com.example.taskmanager.controller;

import com.example.taskmanager.dto.AuthResponse;
import com.example.taskmanager.dto.LoginRequest;
import com.example.taskmanager.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public AuthResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Authenticate user credentials
        // Lefuttatja az ellenőrzést, de nem menti el felesleges változóba
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        // Generate token
        String jwt = tokenProvider.generateToken(loginRequest.getEmail());
        return new AuthResponse(jwt, loginRequest.getEmail());
    }
}