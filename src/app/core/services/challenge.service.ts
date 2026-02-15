import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { Challenge, ChallengeDetail } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = `${environment.apiUrl}/challenges`;

  constructor(private http: HttpClient) { }

  /**
   * Get all challenges with optional filters
   */
  getChallenges(filters?: {
    difficulty?: string;
    category?: string;
    status?: string;
  }): Observable<Challenge[]> {
    let params = new HttpParams();
    
    if (filters?.difficulty) params = params.set('difficulty', filters.difficulty);
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.status) params = params.set('status', filters.status);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const challenges = Array.isArray(response) ? response : (response?.content ?? []);
        return challenges.map((c: any) => ({
          id: String(c.id ?? c.idChallenge ?? ''),
          title: c.title,
          description: c.description,
          category: c.category,
          technology: c.technology,
          startDate: c.startDate ? new Date(c.startDate) : undefined,
          endDate: c.endDate ? new Date(c.endDate) : undefined,
          difficulty: c.difficulty,
          status: c.status,
          maxParticipants: c.maxParticipants,
          points: c.points ?? 0,
          participants: c.participants ?? 0,
          progress: c.progress ?? 0,
          githubUrl: c.githubUrl,
          image: c.image ?? c.imageUrl ?? c.img,
          createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date()
        }));
      })
    );
  }

  /**
   * Get challenge by ID
   */
  getChallengeById(id: string): Observable<ChallengeDetail> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(c => ({
        id: c.idChallenge ?? c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        technology: c.technology,
        startDate: c.startDate ? new Date(c.startDate) : undefined,
        endDate: c.endDate ? new Date(c.endDate) : undefined,
        difficulty: c.difficulty,
        status: c.status,
        maxParticipants: c.maxParticipants,
        points: c.points ?? 0,
        participants: c.participants ?? 0,
        progress: c.progress ?? 0,
        githubUrl: c.githubUrl,
        image: c.image ?? c.imageUrl ?? c.img,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        requirements: c.requirements ?? [],
        resources: c.resources ?? [],
        submissions: c.submissions ?? 0
      }))
    );
  }

  /**
   * Add a new challenge
   */
  addChallenge(challenge: Record<string, any>): Observable<Challenge> {
    // MySQL TEXT ~64KB. Send URL or compressed base64 under limit.
    const img = challenge['image'] || null;
    const trimmed = img && typeof img === 'string' ? img.trim() : '';
    const imageForDb = trimmed.length > 0 && trimmed.length <= 60000 ? trimmed : null;

    const raw: Record<string, any> = {
      title: challenge['title'],
      description: challenge['description'],
      category: challenge['category'] ?? challenge['technology'],
      technology: challenge['technology'],
      difficulty: challenge['difficulty'],
      status: challenge['status'],
      maxParticipants: Math.max(1, challenge['maxParticipants'] ?? 1),
      startDate: challenge['startDate'] ? (challenge['startDate'] instanceof Date ? challenge['startDate'].toISOString() : challenge['startDate']) : null,
      endDate: challenge['endDate'] ? (challenge['endDate'] instanceof Date ? challenge['endDate'].toISOString() : challenge['endDate']) : null,
      points: challenge['points'] ?? 0,
      requirements: challenge['requirements'] ?? [],
      githubUrl: challenge['githubUrl'] || null,
      image: imageForDb
    };
    // Omit null/empty string to avoid validation issues
    const payload: Record<string, any> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (v == null || v === '') continue;
      payload[k] = v;
    }
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(c => ({
        id: c.idChallenge ?? c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        technology: c.technology,
        startDate: c.startDate ? new Date(c.startDate) : undefined,
        endDate: c.endDate ? new Date(c.endDate) : undefined,
        difficulty: c.difficulty,
        status: c.status,
        maxParticipants: c.maxParticipants,
        points: c.points ?? 0,
        participants: c.participants ?? 0,
        progress: c.progress ?? 0,
        githubUrl: c.githubUrl,
        image: c.image ?? c.imageUrl ?? c.img,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt)
      }))
    );
  }

  /**
   * Update an existing challenge
   */
  updateChallenge(id: string, challenge: Record<string, any>): Observable<Challenge> {
    const img = challenge['image'] || null;
    const trimmed = img && typeof img === 'string' ? img.trim() : '';
    const imageForDb = trimmed.length > 0 && trimmed.length <= 60000 ? trimmed : null;

    const startDate = challenge['startDate'];
    const endDate = challenge['endDate'];
    const toIso = (v: any) => !v ? null : (v instanceof Date ? v.toISOString() : v);

    const payload: Record<string, any> = {
      idChallenge: challenge['idChallenge'] ?? id,
      title: challenge['title'] ?? '',
      description: challenge['description'] ?? '',
      category: challenge['category'] ?? '',
      technology: challenge['technology'] ?? '',
      difficulty: challenge['difficulty'] ?? 'BEGINNER',
      status: challenge['status'] ?? 'DRAFT',
      maxParticipants: Math.max(1, Number(challenge['maxParticipants']) || 100),
      points: Math.max(0, Number(challenge['points']) || 100),
      githubUrl: challenge['githubUrl'] ?? null,
      startDate: toIso(startDate),
      endDate: toIso(endDate),
      image: imageForDb
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map(c => ({
        id: String(c.idChallenge ?? c.id ?? id),
        title: c.title,
        description: c.description,
        category: c.category,
        technology: c.technology,
        startDate: c.startDate ? new Date(c.startDate) : undefined,
        endDate: c.endDate ? new Date(c.endDate) : undefined,
        difficulty: c.difficulty,
        status: c.status,
        maxParticipants: c.maxParticipants,
        points: c.points ?? 0,
        participants: c.participants ?? 0,
        progress: c.progress ?? 0,
        githubUrl: c.githubUrl,
        image: c.image ?? c.imageUrl ?? c.img,
        createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
        updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date()
      }))
    );
  }

  /**
   * Delete a challenge
   */
  deleteChallenge(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Join a challenge
   */
  joinChallenge(challengeId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${challengeId}/join`, {});
  }

  /**
   * Submit challenge solution
   */
  submitSolution(challengeId: string, data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${challengeId}/submit`, data);
  }

  /**
   * Get user's enrolled challenges
   */
  getEnrolledChallenges(): Observable<Challenge[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enrolled`).pipe(
      map(challenges =>
        challenges.map(c => ({
          id: c.idChallenge,
          title: c.title,
          description: c.description,
          category: c.category,
          technology: c.technology,
          startDate: c.startDate ? new Date(c.startDate) : undefined,
          endDate: c.endDate ? new Date(c.endDate) : undefined,
          difficulty: c.difficulty,
          status: c.status,
          maxParticipants: c.maxParticipants,
          points: c.points ?? 0,
          participants: c.participants ?? 0,
          progress: c.progress ?? 0,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt)
        }))
      )
    );
  }
}