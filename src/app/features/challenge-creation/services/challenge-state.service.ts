import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ChallengeFormData,
  ChallengeInfo,
  GitHubData,
  Task,
  SettingsData
} from '@core/models/challenge.model';

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
    status: ''
  }
};

@Injectable({
  providedIn: 'root'
})
export class ChallengeStateService {
  private formDataSubject = new BehaviorSubject<ChallengeFormData>({ ...this.deepClone(DEFAULT_FORM_DATA) });
  formData$ = this.formDataSubject.asObservable();

  constructor() {}

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
    // TODO: Replace with actual HTTP call when API is available
    return of({ message: 'Draft saved successfully' });
  }

  publishChallenge(): Observable<unknown> {
    // TODO: Replace with actual HTTP call when API is available
    return of({ id: 'mock-id', message: 'Challenge published successfully' });
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
