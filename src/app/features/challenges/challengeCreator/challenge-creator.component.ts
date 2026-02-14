import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChallengeService } from '@core/services/challenge.service';

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
  startDate: string;
  endDate: string;
  points: number;
  githubUrl?: string;
  image?: string;
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
  submitting = false;
  errorMessage = '';

  formData: Challenge = {
    title: '',
    description: '',
    technology: '',
    difficulty: 'MEDIUM',
    status: 'DRAFT',
    maxParticipants: 0,
    startDate: '',
    endDate: '',
    points: 0,
    githubUrl: '',
    image: '',
    todos: []
  };

  todoInput: string = '';
  imageUploadDragging = false;

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

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

  onCancel(): void {
    this.router.navigate(['/challenges']);
  }

  handleSubmit(): void {
    this.errorMessage = '';
    this.submitting = true;

    const payload: Record<string, any> = {
      title: this.formData.title,
      description: this.formData.description,
      category: this.formData.technology,
      technology: this.formData.technology,
      difficulty: this.formData.difficulty,
      status: this.formData.status,
      maxParticipants: this.formData.maxParticipants,
      startDate: this.formData.startDate ? new Date(this.formData.startDate).toISOString() : undefined,
      endDate: this.formData.endDate ? new Date(this.formData.endDate).toISOString() : undefined,
      points: this.formData.points,
      requirements: this.formData.todos.map(t => t.text),
      githubUrl: this.formData.githubUrl || undefined,
      image: this.formData.image || undefined
    };

    this.challengeService.addChallenge(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/challenges']);
      },
      error: (err) => {
        this.submitting = false;
        console.error('[ChallengeCreator] Error:', err);
        console.error('[ChallengeCreator] Response body:', err?.error);
        const body = err?.error;
        const msg = typeof body === 'string' ? body
          : body?.message || body?.error || (Array.isArray(body?.errors) ? body.errors.join(', ') : null)
          || err?.message || 'Failed to create challenge. Please try again.';
        this.errorMessage = msg;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) this.processImageFile(file);
    input.value = '';
  }

  onImageDrop(event: DragEvent): void {
    const file = event.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) this.processImageFile(file);
  }

  processImageFile(file: File): void {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      this.errorMessage = 'Image must be 5MB or smaller.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.formData.image = reader.result as string;
      this.errorMessage = '';
    };
    reader.readAsDataURL(file);
  }

  clearImage(event: Event): void {
    event.stopPropagation();
    this.formData.image = '';
  }
}