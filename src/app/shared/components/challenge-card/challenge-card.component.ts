import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Challenge } from '@core/models/challenge.model';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.css', './../../../features/challenges/challenges.styles.css']
})
export class ChallengeCardComponent {
  @Input() challenge!: Challenge;
  @Output() joinClicked = new EventEmitter<string>();

  onJoinChallenge(): void {
    this.joinClicked.emit(this.challenge.id);
  }
}
