package com.example.taskmanager.bootstrap;

import com.example.taskmanager.model.*;
import com.example.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        // If no users exist in the database, create some test data
        if (userRepository.count() == 0) {
            log.info("Database empty. Test data generation starting...");

            // 1. Test user creation
            User devUser = User.builder()
                    .email("developer@taskmanager.com")
                    .password("supersecret") // Later, this will be encrypted with BCrypt!
                    .firstName("Péter")
                    .lastName("Teszt")
                    .roles(Set.of(Role.USER, Role.PROJECT_MANAGER))
                    .build();

            userRepository.save(devUser);
            log.info("Test user saved: {}", devUser.getEmail());

            // 2. Test project creation
            Project taskManagerProject = Project.builder()
                    .name("Intelligens Task Manager")
                    .description("Egyetemi féléves projektmunka modern technológiákkal.")
                    .owner(devUser)
                    .build();

            projectRepository.save(taskManagerProject);
            log.info("Test project saved: {}", taskManagerProject.getName());

            // 3. Test task creation
            Task task1 = Task.builder()
                    .title("Backend adatmodell felépítése")
                    .description("Létrehozni a JPA entitásokat és repositorykat a PostgreSQL-hez.")
                    .status(TaskStatus.DONE)
                    .priority(TaskPriority.HIGH)
                    .deadline(LocalDate.now().plusDays(2))
                    .project(taskManagerProject)
                    .assignee(devUser)
                    .build();

            Task task2 = Task.builder()
                    .title("Spring Security és JWT beállítása")
                    .description("Felhasználói autentikáció megvalósítása token alapon.")
                    .status(TaskStatus.IN_PROGRESS)
                    .priority(TaskPriority.CRITICAL)
                    .deadline(LocalDate.now().plusDays(5))
                    .project(taskManagerProject)
                    .assignee(devUser)
                    .build();

            Task task3 = Task.builder()
                    .title("Frontend login felület")
                    .description("React + Material UI alapú bejelentkező oldal lefejlesztése.")
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .deadline(LocalDate.now().plusDays(10))
                    .project(taskManagerProject)
                    .build();

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);

            log.info("3 db test task succesfully saved!");
            log.info("Database initialization completed successfully!");
        } else {
            log.info("The database already contains data, skipping initialization.");
        }
    }
}