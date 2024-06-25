package com.todo.taskgenerator;



import org.springframework.data.jpa.repository.JpaRepository;

public interface taskrepository extends JpaRepository<Task, Long>{
}