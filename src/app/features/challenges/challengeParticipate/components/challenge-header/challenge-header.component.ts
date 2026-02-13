import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.css']
})
export class ChallengeHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() completedCount: number = 0;
  @Input() totalCount: number = 0;
  @Input() timeLeft: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
}