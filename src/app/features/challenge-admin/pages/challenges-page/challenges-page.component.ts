import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeAdminService } from '../../services/challenge-admin.service';
import { Participant } from '../../models/participant.model';

@Component({
  selector: 'app-challenges-page',
  templateUrl: './challenges-page.component.html',
  styleUrls: ['./challenges-page.component.css']
})
export class ChallengesPageComponent implements OnInit {
  challenges: any[] = [];
  filteredChallenges: any[] = [];
  searchTerm = '';
  isEditModalOpen: boolean = false;
  isParticipantsModalOpen: boolean = false;
  selectedChallenge: any = null;
  selectedChallengeParticipants: Participant[] = [];

  constructor(
    private challengeAdminService: ChallengeAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
      this.applySearch();
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/challenges']);
  }

  onCreateChallenge(): void {
    this.router.navigate(['/challenges/wizard']);
  }

  onSearchChange(): void {
    this.applySearch();
  }

  private applySearch(): void {
    const term = (this.searchTerm || '').toLowerCase().trim();
    if (!term) {
      this.filteredChallenges = [...this.challenges];
      return;
    }
    this.filteredChallenges = this.challenges.filter(
      c =>
        (c.title || '').toLowerCase().includes(term) ||
        (c.description || '').toLowerCase().includes(term) ||
        (c.category || '').toLowerCase().includes(term)
    );
  }

  onViewChallenge(challenge: any): void {
    this.onEditChallenge(challenge);
  }

  onEditChallenge(challenge: any): void {
    this.selectedChallenge = challenge;
    this.isEditModalOpen = true;
  }

  onSaveChallenge(updatedChallenge: any): void {
    this.challengeAdminService.updateChallenge(updatedChallenge);
    this.isEditModalOpen = false;
    this.selectedChallenge = null;
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
      this.applySearch();
    });
  }

  onCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedChallenge = null;
  }

  onDuplicateChallenge(challenge: any): void {
    const duplicated = {
      ...challenge,
      id: `${challenge.id}-copy`,
      title: `${challenge.title} (Copy)`,
      status: 'Draft',
      createdAt: new Date()
    };
    this.challengeAdminService.updateChallenge(duplicated);
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
      this.applySearch();
    });
  }

  onViewParticipants(challenge: any): void {
    this.selectedChallenge = challenge;
    
    // Load participants for this challenge
    this.challengeAdminService.getParticipants(challenge.id).subscribe(participants => {
      this.selectedChallengeParticipants = participants;
      this.isParticipantsModalOpen = true;
    });
  }

  onCloseParticipantsModal(): void {
    this.isParticipantsModalOpen = false;
    this.selectedChallenge = null;
    this.selectedChallengeParticipants = [];
  }

  onDeleteChallenge(challenge: any): void {
    if (confirm(`Are you sure you want to delete "${challenge.title}"? This action cannot be undone.`)) {
      this.challengeAdminService.deleteChallenge(challenge.id);
    }
  }
}
