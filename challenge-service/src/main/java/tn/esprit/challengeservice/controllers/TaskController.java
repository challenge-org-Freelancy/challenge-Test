package tn.esprit.challengeservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.challengeservice.entities.Task;
import tn.esprit.challengeservice.services.itaskService;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {

    private final itaskService taskService;

    @PostMapping("/{challengeId}")
    public Task addTask(@PathVariable String challengeId, @RequestBody Task task) {
        return taskService.addTask(challengeId, task);
    }

    @GetMapping("/challenge/{challengeId}")
    public List<Task> getTasksByChallenge(@PathVariable String challengeId) {
        return taskService.getTasksByChallenge(challengeId);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }
}
