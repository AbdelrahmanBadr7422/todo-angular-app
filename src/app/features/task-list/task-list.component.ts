import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  taskForm: FormGroup;
  tasks: Task[] = [];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title,
        completed: false
      };
      this.tasks.push(newTask);
      this.taskForm.reset();
    }
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  clearTasks() {
    this.tasks = [];
  }
}
