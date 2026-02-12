import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    
    if (filters?.difficulty) {
      params = params.set('difficulty', filters.difficulty);
    }
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<Challenge[]>(this.apiUrl, { params });
  }

  /**
   * Get featured challenges
   */
  getFeaturedChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.apiUrl}/featured`);
  }

  /**
   * Get challenge by ID
   */
  getChallengeById(id: string): Observable<ChallengeDetail> {
    return this.http.get<ChallengeDetail>(`${this.apiUrl}/${id}`);
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
    return this.http.get<Challenge[]>(`${this.apiUrl}/enrolled`);
  }
}
