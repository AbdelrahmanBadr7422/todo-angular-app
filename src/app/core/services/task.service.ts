import { Injectable } from '@angular/core';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(id: number, title: string): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = title.trim();
      this.saveTasks();
    }
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }

  // private saveTasks(): void {
  //   localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  // }
  private saveTasks(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }
  private loadTasks(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedTasks = localStorage.getItem(this.storageKey);
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  }
}
