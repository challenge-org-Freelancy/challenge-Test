import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from '@core/models/challenge.model';
import { Participant } from '../models/participant.model';

@Injectable()
export class ChallengeAdminService {
  private challengesSubject = new BehaviorSubject<Challenge[]>([]);
  public challenges$ = this.challengesSubject.asObservable();

  constructor() {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.challengesSubject.next(this.getMockChallenges());
  }

  getChallenges(): Observable<Challenge[]> {
    return this.challenges$;
  }

  updateChallenge(challenge: Challenge): void {
    const challenges = this.challengesSubject.value;
    const index = challenges.findIndex(c => c.id === challenge.id);

    if (index !== -1) {
      challenges[index] = challenge;
    } else {
      challenges.push(challenge);
    }

    this.challengesSubject.next([...challenges]);
  }

  getParticipants(challengeId: string): Observable<Participant[]> {
    return new Observable(observer => {
      observer.next(this.getMockParticipants(challengeId));
      observer.complete();
    });
  }

  private getMockChallenges(): Challenge[] {
    return [
      {
        id: '1',
        title: 'Build a Real-time Chat Application',
        category: 'Full Stack',
        technology: ['React', 'Node.js', 'Socket.io'],
        difficulty: 'Advanced',
        status: 'Active',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-02-28'),
        participants: 342,
        maxParticipants: 500,
        progress: 68,
        points: 250,
        image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/challenge-platform/realtime-chat',
        description: 'Create a fully functional real-time chat application with authentication and message persistence.',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15'),
      },
      {
        id: '2',
        title: 'Design a Modern Landing Page',
        category: 'UI/UX Design',
        technology: ['React', 'Tailwind CSS'],
        difficulty: 'Beginner',
        status: 'Active',
        startDate: new Date('2026-02-10'),
        endDate: new Date('2026-03-10'),
        participants: 156,
        maxParticipants: 300,
        progress: 72,
        points: 150,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
        description: 'Create a beautiful, responsive landing page for a SaaS product.',
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-01-20'),
      },
    ];
  }

  private getMockParticipants(_challengeId: string): Participant[] {
    return [];
  }
}
