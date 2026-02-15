import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChallengeStateService } from '../../services/challenge-state.service';
import { ChallengeFormData, STEPS, Step } from '../../models/challenge.model';
import { slideAnimation } from '@shared/animations/slide.animation';

@Component({
  selector: 'app-challenge-wizard',
  templateUrl: './challenge-wizard.component.html',
  styleUrls: ['./challenge-wizard.component.css'],
  animations: [slideAnimation]
})
export class ChallengeWizardComponent implements OnInit, OnDestroy {
  currentStep = 1;
  steps: Step[] = STEPS;
  formData!: ChallengeFormData;
  showSuccessModal = false;
  private destroy$ = new Subject<void>();

  constructor(private challengeStateService: ChallengeStateService) {
    this.formData = this.challengeStateService.getFormData();
  }

  ngOnInit(): void {
    this.challengeStateService.formData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChallengeFormData) => {
        this.formData = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleNext(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  handleBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  handleSaveDraft(): void {
    this.challengeStateService.saveDraft()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: { message: string }) => {
          alert(response.message);
        },
        error: (error: unknown) => {
          console.error('Error saving draft:', error);
          alert('Failed to save draft');
        }
      });
  }

  handlePublish(): void {
    this.challengeStateService.publishChallenge()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSuccessModal = true;
        },
        error: (error: unknown) => {
          console.error('Error publishing challenge:', error);
          alert('Failed to publish challenge');
        }
      });
  }

  handleCloseSuccess(): void {
    this.showSuccessModal = false;
    this.challengeStateService.resetForm();
    this.currentStep = 1;
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(
          this.formData.challengeInfo.title &&
          this.formData.challengeInfo.description &&
          this.formData.challengeInfo.category &&
          this.formData.challengeInfo.difficulty &&
          this.formData.challengeInfo.technologies.length > 0
        );
      case 2:
        return !!this.formData.githubData.repositoryUrl;
      case 3:
        return this.formData.tasks.length > 0 &&
               this.formData.tasks.every(task => task.title);
      case 4:
        return !!(
          this.formData.settings.startDate &&
          this.formData.settings.endDate &&
          this.formData.settings.status
        );
      case 5:
        return true;
      default:
        return false;
    }
  }
}
