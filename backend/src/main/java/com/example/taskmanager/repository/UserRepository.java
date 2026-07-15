package com.example.taskmanager.repository;

import com.example.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    // Retrieves a user by their email address for login purposes
    Optional<User> findByEmail(String email);

    // Quick check to see if a user with the specified email already exists
    boolean existsByEmail(String email);
}