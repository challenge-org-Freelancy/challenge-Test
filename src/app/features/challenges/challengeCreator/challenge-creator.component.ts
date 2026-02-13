import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Challenge {
  title: string;
  description: string;
  technology: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  maxParticipants: number;
  deadline: string;
  points: number;
  githubUrl?: string;
  todos: TodoItem[];
}

@Component({
  selector: 'app-challenge-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-creator.component.html',
  styleUrls: ['./challenge-creator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChallengeCreatorComponent {
  formData: Challenge = {
    title: '',
    description: '',
    technology: '',
    difficulty: 'MEDIUM',
    status: 'DRAFT',
    maxParticipants: 0,
    deadline: '',
    points: 0,
    githubUrl: '',
    todos: []
  };

  todoInput: string = '';

  get completedTodos(): number {
    return this.formData.todos.filter(t => t.completed).length;
  }

  get totalTodos(): number {
    return this.formData.todos.length;
  }

  get progressPercent(): number {
    return this.totalTodos > 0 ? (this.completedTodos / this.totalTodos) * 100 : 0;
  }

  addTodo(): void {
    if (this.todoInput.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: this.todoInput.trim(),
        completed: false
      };
      this.formData.todos.push(newTodo);
      this.todoInput = '';
    }
  }

  toggleTodo(id: string): void {
    const todo = this.formData.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: string): void {
    this.formData.todos = this.formData.todos.filter(todo => todo.id !== id);
  }

  handleSubmit(): void {
    console.log('Challenge data:', this.formData);
    alert('Challenge created successfully! 🎉');
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }
}