package com.example.taskmanager.service;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    // Retrieve all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Retrieve a single project by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // Create or update a project
    @Transactional
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // Delete a project by ID
    @Transactional
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}