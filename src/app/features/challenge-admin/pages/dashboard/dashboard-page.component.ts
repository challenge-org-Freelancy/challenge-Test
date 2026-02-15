import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeAdminService } from '../../services/challenge-admin.service';
import { Challenge } from '@core/models/challenge.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(
    private challengeAdminService: ChallengeAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
    });
  }

  onCreateChallenge(): void {
    this.router.navigate(['/challenges/wizard']);
  }

  onAIGenerate(): void {
    // Scroll to AI panel or open modal
    console.log('AI Generate clicked');
  }

  onViewAllChallenges(): void {
    this.router.navigate(['/admin/challenges/all']);
  }
}
