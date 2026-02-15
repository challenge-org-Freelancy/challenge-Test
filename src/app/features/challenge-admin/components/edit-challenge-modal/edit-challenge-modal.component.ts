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
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'DevOps',
    'Data Science',
    'Blockchain'
  ];

  difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  statuses = ['Draft', 'Active', 'Closed'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['challenge'] && this.challenge) {
      this.editedChallenge = { ...this.challenge };
    }
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
}
