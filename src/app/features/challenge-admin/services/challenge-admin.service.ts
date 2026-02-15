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

  deleteChallenge(challengeId: string): void {
    const challenges = this.challengesSubject.value.filter(c => c.id !== challengeId);
    this.challengesSubject.next(challenges);
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
        title: 'Mobile-First Landing Page',
        category: 'Frontend',
        technology: ['HTML', 'CSS', 'JavaScript'],
        difficulty: 'Beginner',
        status: 'Active',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-03-01'),
        participants: 789,
        maxParticipants: 1000,
        progress: 92,
        points: 100,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
        description: 'Design and code a mobile-first responsive landing page with modern animations.',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15'),
      },
      {
        id: '2',
        title: 'GraphQL Social Media API',
        category: 'Backend',
        technology: ['GraphQL', 'Apollo', 'Node.js'],
        difficulty: 'Advanced',
        status: 'Active',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-03-15'),
        participants: 234,
        maxParticipants: 400,
        progress: 56,
        points: 280,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
        description: 'Build a GraphQL API for a social media platform with posts, likes, and comments.',
        createdAt: new Date('2026-01-18'),
        updatedAt: new Date('2026-01-18'),
      },
      {
        id: '3',
        title: 'Responsive Dashboard UI',
        category: 'Frontend',
        technology: ['React', 'TypeScript', 'TailwindCSS'],
        difficulty: 'Intermediate',
        status: 'Active',
        startDate: new Date('2026-02-05'),
        endDate: new Date('2026-03-10'),
        participants: 521,
        maxParticipants: 600,
        progress: 81,
        points: 200,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        description: 'Build a modern, responsive admin dashboard with charts, tables, and data visualization.',
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-01-20'),
      },
      {
        id: '4',
        title: 'E-commerce Product Catalog API',
        category: 'Backend',
        technology: ['Python', 'FastAPI', 'PostgreSQL'],
        difficulty: 'Intermediate',
        status: 'Active',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-03-20'),
        participants: 287,
        maxParticipants: 500,
        progress: 72,
        points: 180,
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
        description: 'Design and implement a RESTful API for managing product catalogs with search and filtering.',
        createdAt: new Date('2026-01-22'),
        updatedAt: new Date('2026-01-22'),
      },
      {
        id: '5',
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
        description: 'Create a fully functional real-time chat application with authentication and message persistence.',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15'),
      },
      {
        id: '6',
        title: 'Machine Learning Image Classifier',
        category: 'AI/ML',
        technology: ['Python', 'TensorFlow', 'Keras'],
        difficulty: 'Expert',
        status: 'Active',
        startDate: new Date('2026-02-10'),
        endDate: new Date('2026-04-10'),
        participants: 156,
        maxParticipants: 300,
        progress: 45,
        points: 350,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        description: 'Train and deploy a CNN model for image classification with at least 90% accuracy.',
        createdAt: new Date('2026-01-25'),
        updatedAt: new Date('2026-01-25'),
      },
      {
        id: '7',
        title: 'Kubernetes Deployment Pipeline',
        category: 'DevOps',
        technology: ['Kubernetes', 'Docker'],
        difficulty: 'Advanced',
        status: 'Draft',
        participants: 0,
        progress: 0,
        points: 300,
        description: 'Set up CI/CD with Kubernetes for containerized applications.',
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-01'),
      },
      {
        id: '8',
        title: 'Blockchain Smart Contracts',
        category: 'Blockchain',
        technology: ['Solidity', 'Ethereum'],
        difficulty: 'Expert',
        status: 'Closed',
        participants: 89,
        progress: 100,
        points: 400,
        description: 'Build and deploy smart contracts for a decentralized application.',
        createdAt: new Date('2025-12-01'),
        updatedAt: new Date('2026-01-15'),
      },
      {
        id: '9',
        title: 'Microservices Architecture',
        category: 'Backend',
        technology: ['Node.js', 'Docker'],
        difficulty: 'Advanced',
        status: 'Draft',
        participants: 0,
        progress: 0,
        points: 320,
        description: 'Design and implement a microservices-based system.',
        createdAt: new Date('2026-02-05'),
        updatedAt: new Date('2026-02-05'),
      },
    ];
  }

  private getMockParticipants(_challengeId: string): Participant[] {
    return [];
  }
}
