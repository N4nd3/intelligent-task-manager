package com.example.taskmanager.bootstrap;

import com.example.taskmanager.model.*;
import com.example.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
                log.info("Database is empty. Generating test data...");

                // 1. Create Test User
                User devUser = User.builder()
                        .email("developer@taskmanager.com")
                        .password(passwordEncoder.encode("secretpassword"))
                        .firstName("Peter")
                        .lastName("Test")
                        .roles(Set.of(Role.USER, Role.PROJECT_MANAGER))
                        .build();

                userRepository.save(devUser);
                log.info("Test user saved: {}", devUser.getEmail());

                // 2. Create Test Project
                Project taskManagerProject = Project.builder()
                        .name("Intelligent Task Manager")
                        .description("University project with modern technologies.")
                        .owner(devUser)
                        .build();

                projectRepository.save(taskManagerProject);
                log.info("Test project saved: {}", taskManagerProject.getName());

                // 3. Create Test Tasks
                Task task1 = Task.builder()
                        .title("Setup backend data model")
                        .description("Create JPA entities and repositories for PostgreSQL.")
                        .status(TaskStatus.DONE)
                        .priority(TaskPriority.HIGH)
                        .deadline(LocalDate.now().plusDays(2))
                        .project(taskManagerProject)
                        .assignee(devUser)
                        .build();

                taskRepository.save(task1);
                log.info("Test tasks saved successfully!");
        } else {
                log.info("Database already contains data. Seeding skipped.");
        }
        }
}