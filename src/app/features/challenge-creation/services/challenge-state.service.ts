import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Challenge,
  ChallengeFormData,
  ChallengeInfo,
  GitHubData,
  Task,
  SettingsData
} from '@core/models/challenge.model';
import { ChallengeService } from '@core/services/challenge.service';

const DEFAULT_FORM_DATA: ChallengeFormData = {
  challengeInfo: {
    title: '',
    description: '',
    category: '',
    technologies: [],
    difficulty: '',
    image: null
  },
  githubData: {
    repositoryUrl: '',
    checklist: {
      orgCreated: false,
      repoCreated: false,
      readmeAdded: false,
      forkEnabled: false
    }
  },
  tasks: [],
  settings: {
    startDate: '',
    endDate: '',
    maxParticipants: '',
    points: '',
    status: ''
  }
};

@Injectable({
  providedIn: 'root'
})
export class ChallengeStateService {
  private formDataSubject = new BehaviorSubject<ChallengeFormData>({ ...this.deepClone(DEFAULT_FORM_DATA) });
  formData$ = this.formDataSubject.asObservable();

  constructor(private challengeService: ChallengeService) {}

  getFormData(): ChallengeFormData {
    return this.deepClone(this.formDataSubject.value);
  }

  updateChallengeInfo(data: Partial<ChallengeInfo>): void {
    this.updateFormData({
      challengeInfo: { ...this.formDataSubject.value.challengeInfo, ...data }
    });
  }

  updateGitHubData(data: Partial<GitHubData>): void {
    const current = this.formDataSubject.value.githubData;
    this.updateFormData({
      githubData: {
        ...current,
        ...data,
        checklist: { ...current.checklist, ...(data.checklist ?? {}) }
      }
    });
  }

  updateTasks(tasks: Task[]): void {
    this.updateFormData({ tasks });
  }

  updateSettings(settings: Partial<SettingsData>): void {
    this.updateFormData({
      settings: { ...this.formDataSubject.value.settings, ...settings }
    });
  }

  saveDraft(): Observable<{ message: string }> {
    const payload = this.buildApiPayload('DRAFT');
    return this.challengeService.addChallenge(payload).pipe(
      map(() => ({ message: 'Draft saved successfully' }))
    );
  }

  publishChallenge(): Observable<Challenge> {
    const status = this.mapStatus(this.formDataSubject.value.settings.status);
    const payload = this.buildApiPayload(status);
    return this.challengeService.addChallenge(payload);
  }

  private mapStatus(formStatus: string): string {
    switch (formStatus) {
      case 'published': return 'ACTIVE';
      case 'closed': return 'COMPLETED';
      case 'draft':
      default: return 'DRAFT';
    }
  }

  private mapDifficulty(difficulty: string): string {
    if (!difficulty) return 'MEDIUM';
    const d = difficulty.toLowerCase();
    if (d === 'easy') return 'EASY';
    if (d === 'medium') return 'MEDIUM';
    if (d === 'hard') return 'HARD';
    if (d === 'expert') return 'EXPERT';
    return difficulty.toUpperCase();
  }

  private buildApiPayload(status: string): Record<string, any> {
    const data = this.formDataSubject.value;
    const info = data.challengeInfo;
    const settings = data.settings;
    const technology = info.technologies?.length ? info.technologies[0] : info.category || '';

    return {
      title: info.title,
      description: info.description,
      category: info.category,
      technology,
      difficulty: this.mapDifficulty(info.difficulty),
      status,
      maxParticipants: Math.max(1, parseInt(settings.maxParticipants || '100', 10) || 100),
      startDate: settings.startDate ? new Date(settings.startDate).toISOString() : undefined,
      endDate: settings.endDate ? new Date(settings.endDate).toISOString() : undefined,
      points: Math.max(0, parseInt(settings.points || '100', 10) || 100),
      requirements: (data.tasks || []).map((t: Task) => t.title || t.description).filter(Boolean),
      githubUrl: data.githubData?.repositoryUrl || undefined,
      image: info.image || undefined
    };
  }

  resetForm(): void {
    this.formDataSubject.next(this.deepClone(DEFAULT_FORM_DATA));
  }

  private updateFormData(partial: Partial<ChallengeFormData>): void {
    this.formDataSubject.next({
      ...this.formDataSubject.value,
      ...partial
    });
  }

  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
