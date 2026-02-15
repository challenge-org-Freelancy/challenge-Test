import { Component, OnInit } from '@angular/core';
import { ChallengeAdminService } from '../../services/challenge-admin.service';
import { Participant } from '../../models/participant.model';

@Component({
  selector: 'app-challenges-page',
  templateUrl: './challenges-page.component.html',
  styleUrls: ['./challenges-page.component.css']
})
export class ChallengesPageComponent implements OnInit {
  challenges: any[] = [];
  isEditModalOpen: boolean = false;
  isParticipantsModalOpen: boolean = false;
  selectedChallenge: any = null;
  selectedChallengeParticipants: Participant[] = [];

  constructor(private challengeAdminService: ChallengeAdminService) {}

  ngOnInit(): void {
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
    });
  }

  onEditChallenge(challenge: any): void {
    this.selectedChallenge = challenge;
    this.isEditModalOpen = true;
  }

  onSaveChallenge(updatedChallenge: any): void {
    this.challengeAdminService.updateChallenge(updatedChallenge);
    this.isEditModalOpen = false;
    this.selectedChallenge = null;
    
    // Reload challenges
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
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
    
    // Reload challenges
    this.challengeAdminService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
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
}
