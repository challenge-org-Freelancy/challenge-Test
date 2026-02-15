import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-challenge-modal',
  templateUrl: './edit-challenge-modal.component.html',
  styleUrls: ['./edit-challenge-modal.component.css']
})
export class EditChallengeModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() challenge: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedChallenge: any = {};

  categories = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'AI/ML',
    'DevOps',
    'Data Science',
    'Blockchain'
  ];

  difficulties = [
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' },
    { value: 'EXPERT', label: 'Expert' }
  ];
  statuses = ['Draft', 'Active', 'Closed'];
  private readonly MAX_IMAGE_BYTES = 55000;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['challenge'] && this.challenge) {
      this.editedChallenge = {
        ...this.challenge,
        difficulty: this.normalizeDifficulty(this.challenge.difficulty),
        startDate: this.toDateInputValue(this.challenge.startDate),
        endDate: this.toDateInputValue(this.challenge.endDate)
      };
    }
  }

  private normalizeDifficulty(d?: string): string {
    if (!d) return 'BEGINNER';
    const u = String(d).toUpperCase();
    if (['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'].includes(u)) return u;
    const map: Record<string, string> = { 'EASY': 'BEGINNER', 'MEDIUM': 'INTERMEDIATE', 'HARD': 'ADVANCED' };
    return map[u] ?? 'BEGINNER';
  }

  private toDateInputValue(value: Date | string | undefined): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit(this.editedChallenge);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target?.result as string;
        this.compressImage(dataUrl).then(compressed => {
          this.editedChallenge.image = compressed;
        }).catch(() => {
          this.editedChallenge.image = null;
        });
      };
      reader.readAsDataURL(file);
    }
    input.value = '';
  }

  removeImage(): void {
    this.editedChallenge.image = null;
  }

  private compressImage(dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 400;
        const maxH = 300;
        let w = img.width;
        let h = img.height;
        if (w > maxW || h > maxH) {
          const r = Math.min(maxW / w, maxH / h);
          w = Math.round(w * r);
          h = Math.round(h * r);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject();
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        let quality = 0.75;
        let result = canvas.toDataURL('image/jpeg', quality);
        while (result.length > this.MAX_IMAGE_BYTES && quality > 0.2) {
          quality -= 0.1;
          result = canvas.toDataURL('image/jpeg', quality);
        }
        if (result.length > this.MAX_IMAGE_BYTES) {
          const scale = Math.sqrt(this.MAX_IMAGE_BYTES / result.length);
          canvas.width = Math.max(100, Math.round(w * scale));
          canvas.height = Math.max(75, Math.round(h * scale));
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          result = canvas.toDataURL('image/jpeg', 0.6);
        }
        resolve(result);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  }
}
