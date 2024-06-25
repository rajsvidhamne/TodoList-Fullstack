package com.todo.taskgenerator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class taskcontroller {

  @Autowired
  private taskrepository taskRepo;

  @GetMapping("/hello")
  public String helloWorld() {
    return "hello world";
  }

  @PostMapping("/api/tasks")
  public Task createTask(@RequestBody Task t) {
    taskRepo.save(t);
    return t;
  }

  @GetMapping("/api/tasks")
  public List<Task> getAllTasks() {
    return taskRepo.findAll();
  }

  @PutMapping("/api/tasks/{id}")
  public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
    task.setId(id);
    return taskRepo.save(task);
  }

  @DeleteMapping("/api/tasks/{id}") // Added /api/tasks/{id}
  public void deleteTask(@PathVariable Long id) {
    taskRepo.deleteById(id);
  }
}