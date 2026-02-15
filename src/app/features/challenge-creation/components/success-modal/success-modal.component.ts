import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent {
  @Input() isOpen = false;
  @Input() challengeTitle = '';
  @Output() close = new EventEmitter<void>();

  copied = false;

  get participationLink(): string {
    const slug = this.challengeTitle.toLowerCase().replace(/\s+/g, '-');
    return `https://platform.example.com/challenges/${slug}`;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.participationLink).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  viewChallenge(): void {
    window.open(this.participationLink, '_blank');
  }

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
