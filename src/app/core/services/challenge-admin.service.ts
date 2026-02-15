import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '@core/models/challenge.model';
import { Participant } from '@core/models/participant.model';
import { ChallengeService } from './challenge.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeAdminService {
  constructor(private challengeService: ChallengeService) {}

  getChallenges(): Observable<Challenge[]> {
    return this.challengeService.getChallenges();
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    const payload = this.toApiPayload(challenge);
    payload['idChallenge'] = challenge.id;
    return this.challengeService.updateChallenge(challenge.id, payload);
  }

  deleteChallenge(challengeId: string): Observable<void> {
    return this.challengeService.deleteChallenge(challengeId);
  }

  duplicateChallenge(challenge: Challenge): Observable<Challenge> {
    const payload = this.toApiPayload({
      ...challenge,
      id: '',
      title: `${challenge.title} (Copy)`,
      status: 'Draft',
      participants: 0,
      progress: 0
    });
    return this.challengeService.addChallenge(payload);
  }

  getParticipants(challengeId: string): Observable<Participant[]> {
    return new Observable(observer => {
      observer.next(this.getMockParticipants(challengeId));
      observer.complete();
    });
  }

  private toApiPayload(c: Challenge): Record<string, any> {
    const tech = c.technology;
    const techValue = Array.isArray(tech) ? (tech[0] ?? tech.join(',')) : (tech ?? '');
    const startDate = this.toIsoDate(c.startDate);
    const endDate = this.toIsoDate(c.endDate);

    return {
      title: c.title ?? '',
      description: c.description ?? '',
      category: c.category ?? '',
      technology: techValue,
      difficulty: this.mapDifficultyToApi(c.difficulty),
      status: this.mapStatusToApi(c.status),
      maxParticipants: Math.max(1, Number(c.maxParticipants) || 100),
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      points: Math.max(0, Number(c.points) || 100),
      githubUrl: c.githubUrl ?? null,
      image: c.image && String(c.image).trim() ? c.image : null
    };
  }

  private mapDifficultyToApi(difficulty?: string): string {
    if (!difficulty) return 'BEGINNER';
    const d = String(difficulty).toUpperCase();
    if (['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'].includes(d)) return d;
    const map: Record<string, string> = {
      'EASY': 'BEGINNER',
      'MEDIUM': 'INTERMEDIATE',
      'HARD': 'ADVANCED'
    };
    return map[d] ?? 'BEGINNER';
  }

  private toIsoDate(val: Date | string | undefined): string | undefined {
    if (!val) return undefined;
    const d = val instanceof Date ? val : new Date(val);
    return isNaN(d.getTime()) ? undefined : d.toISOString();
  }

  private mapStatusToApi(status?: string): string {
    if (!status) return 'DRAFT';
    const s = status.toLowerCase();
    if (s === 'active') return 'ACTIVE';
    if (s === 'closed' || s === 'completed') return 'COMPLETED';
    return 'DRAFT';
  }

  private getMockParticipants(_challengeId: string): Participant[] {
    return [
      { id: 'p1', name: 'Sarah Chen', email: 'sarah.chen@example.com', enrolledDate: '2026-02-01', progress: 100, tasksCompleted: 5, totalTasks: 5, status: 'Completed', lastActivity: '2026-02-12' },
      { id: 'p2', name: 'Marcus Johnson', email: 'marcus.j@example.com', avatar: 'https://i.pravatar.cc/150?u=marcus', enrolledDate: '2026-02-03', progress: 80, tasksCompleted: 4, totalTasks: 5, status: 'Active', lastActivity: '2026-02-13' },
      { id: 'p3', name: 'Emma Wilson', email: 'emma.wilson@example.com', enrolledDate: '2026-02-05', progress: 60, tasksCompleted: 3, totalTasks: 5, status: 'Active', lastActivity: '2026-02-11' },
      { id: 'p4', name: 'Alex Rivera', email: 'alex.rivera@example.com', avatar: 'https://i.pravatar.cc/150?u=alex', enrolledDate: '2026-02-02', progress: 40, tasksCompleted: 2, totalTasks: 5, status: 'Active', lastActivity: '2026-02-10' },
      { id: 'p5', name: 'Jordan Taylor', email: 'jordan.t@example.com', enrolledDate: '2026-02-08', progress: 20, tasksCompleted: 1, totalTasks: 5, status: 'Active', lastActivity: '2026-02-09' }
    ];
  }
}
