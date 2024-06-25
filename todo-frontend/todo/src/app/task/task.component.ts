import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(private taskService: TaskService) { }

  newTask: Task = { id: 0, description: '', status: false };
  tasks: Task[] = [];
  editMode: boolean = false;
  editTaskId: number | null = null;

  ngOnInit(): void {
    this.getAllTasks();
  }

  createTask(): void {
    if (this.editMode) {
      this.taskService.updateTask(this.editTaskId!, this.newTask).subscribe(() => {
        this.resetForm();
        this.getAllTasks();
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe(() => {
        this.resetForm();
        this.getAllTasks();
      });
    }
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task): void {
    console.log('Editing task', task);
    this.newTask = { ...task };
    this.editMode = true;
    this.editTaskId = task.id;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getAllTasks();
    });
  }

  private resetForm(): void {
    this.newTask = { id: 0, description: '', status: false };
    this.editMode = false;
    this.editTaskId = null;
  }
}